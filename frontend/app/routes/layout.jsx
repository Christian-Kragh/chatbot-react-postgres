import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        {/* Sidebar header */}
        <div className="sidebar-header">
          <h2 className="chatbot-title">Chatbot</h2>
          <a href="/chat/new" className="new-chat-btn">
            + New
          </a>
        </div>
        {/* Chat threads list */}
        <nav className="chat-threads-list" aria-label="Chat threads">
          <ul>
            <li className="chat-thread-item">
              <a
                href="/chat/how-to-learn-programming"
                className="chat-thread-link"
              >
                How to learn programming?
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/best-pizza-toppings" className="chat-thread-link">
                What are the best pizza toppings?
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/explain-quantum-physics"
                className="chat-thread-link"
              >
                Can you explain quantum physics?
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/morning-routine-ideas"
                className="chat-thread-link"
              >
                Help me create a morning routine
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/weekend-activity-suggestions"
                className="chat-thread-link"
              >
                What should I do this weekend?
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/why-sky-blue" className="chat-thread-link">
                Why is the sky blue?
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/learn-new-language" className="chat-thread-link">
                How do I learn a new language?
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/meaning-of-life" className="chat-thread-link">
                What's the meaning of life?
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/funny-joke-please" className="chat-thread-link">
                Tell me a funny joke
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/healthy-dinner-ideas" className="chat-thread-link">
                What's a healthy dinner idea?
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/good-book-recommendations"
                className="chat-thread-link"
              >
                Recommend me a good book
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/creative-writing-prompt"
                className="chat-thread-link"
              >
                Give me a creative writing prompt
              </a>
            </li>
            <li className="chat-thread-item">
              <a href="/chat/fix-slow-computer" className="chat-thread-link">
                My computer is slow, help?
              </a>
            </li>
            <li className="chat-thread-item">
              <a
                href="/chat/interesting-history-fact"
                className="chat-thread-link"
              >
                Tell me an interesting history fact
              </a>
            </li>
          </ul>
        </nav>
        {/* Sidebar footer */}
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
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
