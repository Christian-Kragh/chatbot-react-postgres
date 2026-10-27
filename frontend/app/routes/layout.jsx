
import { Outlet, useLoaderData, redirect } from "react-router";
import Sidebar from "../components/Sidebar.jsx";

export async function clientLoader() {

  const apiUrl = import.meta.env.VITE_API_URL

  const url = `${apiUrl}/api/threads`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch threads: ${response.status}`)
  }

  const threads = await response.json()

  return { threads }
}

export async function clientAction({ request }) {
  const apiUrl = import.meta.env.VITE_API_URL

  const formData = await request.formData()
  const intent = formData.get("intent")
  const threadId = formData.get("threadId")

  if (intent === "delete" && threadId) {
    try {
      const response = await fetch(`${apiUrl}/api/threads/${threadId}`,
        {
          method: "DELETE"
        }
      )

      if (!response.ok) {
        return { error: `Failed to delete thread: ${response.status}` }
      }

      return { succes: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  return null
}

export default function Layout() {
  const { threads } = useLoaderData()

  return (
    <div className="app-layout">
      <Sidebar threads={threads} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}