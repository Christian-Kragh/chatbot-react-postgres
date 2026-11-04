
import { Outlet, useLoaderData, redirect } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import { apiFetch } from "../lib/apiFetch.js";
import { supabase } from "../lib/supabase.js";

export async function clientLoader() {

  const response = await apiFetch("/api/threads")

  if (!response.ok) {
    throw new Error(`Failed to fetch threads: ${response.status}`)
  }

  const threads = await response.json()

  return { threads }
}

export async function clientAction({ request }) {

  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "delete") {
    
    const threadId = formData.get("threadId")

    try {
      const response = await apiFetch(`/api/threads/${threadId}`,
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

  if (intent === "logout") {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error.message)
    }

    return redirect("/login")
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