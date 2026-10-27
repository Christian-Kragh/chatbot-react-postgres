
import express from "express"
import cors from "cors";
import sql from "./db.js"

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Chatbot API Server 🤖",
        version: "1.0.0",
    });
});

app.get("/api/threads", async (request, response) => {
    try {
        const threads = await sql`
        SELECT id, title, created_at
        FROM threads
        ORDER BY created_at DESC`;

        response.json(threads)
    }
    catch (error) {
        console.error("Error fetching threads", error)
        response.status(500).json({
            error: "Failed to fetch threads from database"
        })
    }
})

app.get("/api/threads/:id", async (request, response) => {
    try {
        const threadId = request.params.id
        const threads = await sql`
            SELECT id, title, created_at
            FROM threads
            WHERE id = ${threadId}`;

        if (threads.length === 0) {
            return response.status(404).json({
                error: "Thread not found"
            })
        }

        response.json(threads[0])
    }
    catch (error) {
        console.error("Error fetching thread:", error)
        response.status(500).json({
            error: "Failed to fetch thread from database"
        })
    }
})

app.get("/api/threads/:id/messages", async (request, response) => {
    try {
        const threadId = request.params.id

        const messages = await sql`
            SELECT id, thread_id, type, content, created_at
            FROM messages
            WHERE thread_id = ${threadId}
            ORDER BY created_at ASC`;

        response.json(messages)
    }
    catch (error) {
        console.log("Error fetching messages", error)
        response.status(500).json({
            error: "Failed to fetch messages from database"
        })

    }
})

app.post("/api/threads/:id/messages", async (request, response) => {
    try {
        const threadId = request.params.id
        const { type, content } = request.body

        if (!type || !content) {
            return response.status(400).json({
                error: "Both 'type' and 'content' are required"
            })
        }

        if (type !== 'user' && type !== 'bot') {
            return response.status(400).json({
                error: "Type must be either 'user' og 'bot'"
            })
        }

        const trimmedContent = content.trim()
        if (trimmedContent.length === 0) {
            return response.status(400).json({
                error: "Content cannot be empty"
            })
        }

        const userMessages = await sql`
        INSERT INTO messages (thread_id, type, content)
        VALUES (${threadId}, ${type}, ${trimmedContent})
        RETURNING id, thread_id, type, content, created_at
        `;

        const userMessage = userMessages[0]

        const allMessages = await sql`
        SELECT id, thread_id, type, content, created_at
        FROM messages
        WHERE thread_id = ${threadId}
        ORDER BY created_at ASC
        `;

        const groqMessages = allMessages.map((msg) => ({
            role: msg.type === "bot" ? "assistant" : "user",
            content: msg.content
        }))

        const systemPrompt = {
            role: "system",
            content:
                "You are a helpful and friendly AI assistant. Keep your responses concise, clear, and conversational. If you don't know something, admit it honestly. Be encouraging and supportive in your tone."
        }

        groqMessages.unshift(systemPrompt)

        const apiKey = process.env.GROQ_API_KEY

        if (!apiKey) {
            console.error("Groq API key not configured")
            return response.status(500).json(userMessage)
        }

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    "messages": groqMessages,
                    "model": "openai/gpt-oss-20b",
                    "temperature": 1,
                    "max_completion_tokens": 2048,
                    "top_p": 1,
                    "stream": false,
                    "reasoning_effort": "medium",
                    "stop": null
                })
            }
        )

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json()
            console.error("Groq API error:", errorData)

            return response.status(502).json(userMessage)
        }

        const aiData = await groqResponse.json()
        const aiContent = aiData.choices[0].message.content

        const botMessages = await sql`
        INSERT INTO messages (thread_id, type, content)
        VALUES (${threadId}, 'bot', ${aiContent})
        RETURNING id, thread_id, type, content, created_at
        `;

        const botMessage = botMessages[0]

        response.status(201).json({
            userMessage: userMessage,
            botMessage: botMessage
        })
    }
    catch (error) {
        console.log("Error creating message", error)
        response.status(500).json({
            error: "Failed to create message"
        })
    }
})

app.post("/api/threads", async (request, response) => {
    try {
        const { title, content } = request.body

        if (!title || !content) {
            return response.status(400).json({
                error: "Both 'title' and 'content' are required"
            })
        }

        const trimmedTitle = title.trim()
        if (trimmedTitle.length === 0) {
            return response.status(400).json({
                error: "Title cannot be empty"
            })
        }

        const trimmedContent = content.trim()
        if (trimmedContent.length === 0) {
            return response.status(400).json({
                error: "Content cannot be empty"
            })
        }

        const threads = await sql`
        INSERT INTO threads (title)
        VALUES (${trimmedTitle})
        RETURNING id, title, created_at
        `;

        const thread = threads[0]

        const messages = await sql`
        INSERT INTO messages (thread_id, type, content)
        VALUES (${thread.id}, 'user', ${trimmedContent})
        RETURNING id, thread_id, type, content, created_at
        `;

        return response.status(201).json({
            thread: thread,
            message: messages[0]
        })
    }
    catch (error) {
        console.error("Error creating thread:", error)
        response.status(500).json({
            error: "Failed to create thread"
        })
    }
})

app.patch("/api/threads/:id", async (request, response) => {
    try {
        const threadId = request.params.id

        const { title } = request.body

        if (!title) {
            return response.status(400).json({
                error: "Title is required"
            })
        }

        const trimmedTitle = title.trim()
        if (trimmedTitle.lenght === 0) {
            return response.status(400).json({
                error: "Title cannot be empty"
            })
        }

        const result = await sql`
        UPDATE threads
        SET title = ${trimmedTitle}
        WHERE id = ${threadId}
        RETURNING id, title, created_at
        `;

        if (result.length === 0) {
            return response.status(404).json({
                error: "Thread not found"
            })
        }

        response.json(result[0])
    }
    catch (error) {
        console.error("Error updating thread:", error)
        response.status(500).json({
            error: "Failed to update thread"
        })
    }
})

app.delete("/api/threads/:id", async (request, response) => {
    try {
        const threadId = request.params.id

        const result = await sql`
        DELETE FROM threads
        WHERE id = ${threadId}
        RETURNING id
        `;

        if (result.length === 0) {
            return response.status(404).json({
                error: "Thread not found"
            })
        }

        response.json({
            message: "Thread deleted succesfully",
            deleteId: result[0].id
        })
    }
    catch (error) {
        console.error("Error deleting thread:", error)
        response.status(500).json({
            error: "Failed to delete thread"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})