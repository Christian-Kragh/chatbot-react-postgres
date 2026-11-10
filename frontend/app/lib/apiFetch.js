
import { supabase } from "./supabase.js"
import { redirect } from "react-router"

export async function apiFetch(path, options = {}) {
    const apiUrl = import.meta.env.VITE_API_URL
    const url = `${apiUrl}${path}`

    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    const headers = {
        ...options.headers
    }

    if (!token) {
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, {
        ...options,
        headers
    })

    if (response.status === 401) {
        const currentPath = window.location.pathname + window.location.search
        throw redirect(`/login?redirect=${encodeURIComponent(currentPath)}`)
    }

    return response
}