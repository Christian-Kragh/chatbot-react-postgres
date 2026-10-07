
function SideBarHeader() {
  return (
    <div className="sidebar-header">
      <h2 className="chatbot-title">Chatbot</h2>
      <a href="/chat/new" className="new-chat-btn">
        + New
      </a>
    </div>
  )
}

function ChatThreadItem(props) {
  return (
    <li className="chat-thread-item">
      <a href={props.href} className="chat-thread-link">
        {props.title}
      </a>
    </li>
  )
}

function ChatThreadsList() {
  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
      <ul>
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
        <ChatThreadItem />
      </ul>
    </nav>
  )
}

function SideBarFooter() {
  return (
    <div className="sidebar-footer">
      <a href="/profile" className="user-profile">
        <img
          src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
          alt="User avatar"
          className="user-avatar"
          width={30}
          height={30}
        />
        <span className="user-name">Batman</span>
      </a>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Sidebar header */}
      <SideBarHeader />
      {/* Chat threads list */}
      <ChatThreadsList />
      {/* Sidebar footer */}
      <SideBarFooter />
    </aside>
  )
}
