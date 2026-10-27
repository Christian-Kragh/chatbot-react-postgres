
import { Form } from "react-router";

function Message({ type, children }) {
  return (
    <div className={`message ${type}-message`}>
      <div className="message-content">{children}</div>
    </div>
  );
}

function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map(({ id, type, content }) => (
        <Message key={id} type={type}>
          {content}
        </Message>
      ))}
    </div>
  );
}

function ChatInput() {
  return (
    <div className="chat-input-container">
      <Form method="post" className="chat-input-wrapper">
        <textarea
          name="message"
          className="chat-input"
          placeholder="Type your message here..."
          rows="1"
          required
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </Form>
    </div>
  );
}

export { Message, ChatMessages, ChatInput };
