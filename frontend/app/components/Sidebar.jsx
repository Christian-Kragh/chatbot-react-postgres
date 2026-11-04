
import { useEffect, useState } from "react";
import { href, Link, NavLink, useFetcher, Form } from "react-router";
import { supabase } from "../lib/supabase.js";

function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <h2 className="chatbot-title">Chatbot</h2>
      <Link to="/chat/new" className="new-chat-btn">
        + New
      </Link>
    </div>
  );
}

function ChatThreadItem({ thread }) {

  const { id, title } = thread
  const fetcher = useFetcher()

  const handleDeleteClick = (event) => {
    event.stopPropagation();

    if (onDeleteThread) {
      onDeleteThread(id)
    }
  }

  const isDeleting = fetcher.state !== "idle" && fetcher.formData?.get("threadId") === id

  return (
    <li className="chat-thread-item">
      <div className="chat-thread-item-content">
        <NavLink
          to={href("/chat/:threadId", { threadId: id })}
          className={({ isActive }) =>
            isActive
              ? "chat-thread-link chat-thread-link-active"
              : "chat-thread-link"
          }
        >
          {title}
        </NavLink>
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="threadId" value={id} />
          <button
            className="delete-thread-btn"
            aria-label={`Delete thread: ${title}`}
            title="Delete this conversation"
            type="submit"
            disabled={isDeleting}
          >
            {isDeleting ? "···" : "×"}
          </button>

        </fetcher.Form>
      </div>
    </li>
  );
}

function ChatThreadsList({ threads = [] }) {

  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchValue.toLowerCase()),)

  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search conversations..." value={searchValue} onChange={handleSearchChange} />
      </div>

      <ul>
        {filteredThreads.map((thread) => (
          <ChatThreadItem key={thread.id} thread={thread} />
        ))}
      </ul>
    </nav>
  );
}

function SidebarFooter() {

  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        setUserEmail(session.user.email)
      }
    }
    getUser()
  }, [])

  return (
    <div className="sidebar-footer">
      <div className="user-profile">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail || "User")}&background=0D0D0D&color=fff&size=40`}
          alt="User avatar"
          className="user-avatar"
          width={30}
          height={30}
        />

        <span className="user-name">{userEmail || "Loading..."}</span>
      </div>
      <Form method="post">
        <button
          type="submit"
          name="intent"
          value="logout"
          className="logout-btn"
          title="Log out"
        >
          ×
        </button>
      </Form>
    </div>
  );
}

export default function Sidebar({ threads }) {
  return (
    <aside className="sidebar">
      <SidebarHeader />
      <ChatThreadsList threads={threads} />
      <SidebarFooter />
    </aside>
  );
}
