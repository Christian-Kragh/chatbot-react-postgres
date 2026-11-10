import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY must be set")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function requireAuth(request, response, next) {

    try {
        const authHeader = request.headers.authorization

        if (!authHeader) {
            return response.status(401).json({
                error: "Authentication required. Please provide a valid token."
            })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return response.status(401).json({
                error: "Invalid authorization header format. Expected: Bearer <token>"
            })
        }

        const { data: { user }, error } = await supabase.auth.getUser(token)

        if (error || !user) {
            return response.status(401).json({
                error: "Invalid or expired token. Please log in again.",
            })
        }

        request.userId = user.id
        next()

    }
    catch (error) {
        console.error("Authentication error:", error)
        return response.status(401).json({ error: "Authentication failed. Please try again." })
    }
}