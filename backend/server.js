
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

        const messages = await sql`
        INSERT INTO messages (thread_id, type, content)
        VALUES (${threadId}, ${type}, ${trimmedContent})
        RETURNING id, thread_id, type, content, created_at
        `;

        response.status(201).json(messages[0])
    }
    catch (error) {
        console.log("Error creating message", error)
        response.status(500).json({
            error: "Failed to create message"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})