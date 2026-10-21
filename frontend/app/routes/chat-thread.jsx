
import { useLoaderData, useActionData, Link, useRouteError, href } from "react-router"
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

export function ErrorBoundary() {
    const error = useRouteError()

    const isNotFound = error?.status === 404

    return (
        <div className="chat-container">
            <div className="chat-thread-header">
                <h2>{isNotFound ? "Thread Not Found" : "Something Went Wrong"}</h2>
                <p>
                    {isNotFound
                        ? "This conversation may have been deleted or never existed."
                        : error?.message || "An unexpected error occurred."}
                </p>
                <p>
                    <Link to={href("/chat/new")}>Start a new chat</Link>
                </p>
            </div>
        </div>
    )
}

export async function clientLoader({ params }) {

    const apiUrl = import.meta.env.VITE_API_URL
    const threadUrl = `${apiUrl}/api/threads/${params.threadId}`;
    const threadResponse = await fetch(threadUrl)

    if (threadResponse.status === 400) {
        throw new Response("Thread not found", { status: 404 })
    }

    if (!threadResponse.ok) {
        throw new Error(`Failed to fetch thread: ${threadResponse.status}`)
    }

    const thread = await threadResponse.json()

    const messageUrl = `${apiUrl}/api/threads/${params.threadId}/messages`
    const messagesResponse = await fetch(messageUrl)


    if (!messagesResponse.ok) {
        throw new Error(`Failed to fetch messages: ${messagesResponse.status}`)
    }

    const messages = await messagesResponse.json()

    return { thread, messages }
}

export async function clientAction({ params, request }) {
    const apiUrl = import.meta.env.VITE_API_URL

    const formData = await request.formData()
    const content = formData.get("message")

    if (!content || !content.trim()) {
        return { error: "Message cannot be empty" }
    }

    const newMessage = {
        type: "user",
        content: content.trim()
    }

    try {
        const response = await fetch(`${apiUrl}/api/threads/${params.threadId}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMessage)
            }
        )

        if (response.status === 400) {
            const error = await response.json()
            return { error: error.error || "Invalid message data" }
        }

        if (!response.ok) {
            throw new Error(`Failed to create message: ${response.status}`)
        }

        return { succes: true }
    } catch (error) {
        return { error: error.message }
    }
}

export default function ChatThread() {
    const { thread, messages } = useLoaderData();
    const actionData = useActionData();

    return (
        <main className="chat-container">
            <div className="chat-thread-header">
                <h2>{thread.title}</h2>
            </div>
            <ChatMessages messages={messages} />
            <ChatInput />
            {actionData?.error && (
                <div className="error-message">{actionData.error}</div>
            )}
        </main>
    )
}