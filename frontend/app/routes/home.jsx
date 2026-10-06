export default function Home() {
  return (
    <main className="chat-container">
      <div className="chat-messages">
        {/* Chat message 1 */}
        <div className="message user-message">
          <div className="message-content">
            Hello! Can you help me understand React Router v7?
          </div>
        </div>

        <div className="message bot-message">
          <div className="message-content">
            Of course! React Router v7 is the latest version that introduces
            several improvements including better data loading, enhanced nested
            routing, and improved TypeScript support. What specific aspect would
            you like to learn about?
          </div>
        </div>

        {/* Chat message 2 */}
        <div className="message user-message">
          <div className="message-content">
            How do nested routes work in v7?
          </div>
        </div>

        <div className="message bot-message">
          <div className="message-content">
            Nested routes in React Router v7 allow you to create hierarchical UI
            structures. You define parent routes that contain child routes, and
            use the `&lt;Outlet /&gt;` component to render child components. The
            parent route acts as a layout component that wraps its children.
          </div>
        </div>

        {/* Chat message 3 */}
        <div className="message user-message">
          <div className="message-content">
            What's the difference between route() and layout() helpers?
          </div>
        </div>

        <div className="message bot-message">
          <div className="message-content">
            Great question! The `route()` helper creates routes that add URL
            segments, while `layout()` creates routes that only provide UI
            structure without affecting the URL. Layout routes are perfect for
            shared components like sidebars or headers that should appear across
            multiple pages.
          </div>
        </div>

        {/* Chat message 4 */}
        <div className="message user-message">
          <div className="message-content">
            Can you show me an example of a routes.js configuration?
          </div>
        </div>

        <div className="message bot-message">
          <div className="message-content">
            Sure! Here's a basic example: You can use route(), index(), and
            layout() helpers to create nested route structures. The layout()
            function creates wrapper components, while route() adds URL
            segments. This approach gives you clean, hierarchical routing that's
            easy to maintain.
          </div>
        </div>

        {/* Chat message 5 */}
        <div className="message user-message">
          <div className="message-content">
            How do I handle data loading in React Router v7?
          </div>
        </div>

        <div className="message bot-message">
          <div className="message-content">
            React Router v7 provides excellent data loading capabilities through
            loader functions. You can define a `loader` function in your route
            component that runs before the component renders, ensuring your data
            is available immediately. You can access the loaded data using the
            `useLoaderData()` hook within your component.
          </div>
        </div>
      </div>

      {/* Chat input area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Type your message here..."
            rows="1"
          />
          <button className="send-button" type="button">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
