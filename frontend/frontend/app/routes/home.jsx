import { ChatMessages, ChatInput } from "../components/Chat.jsx";

/**
 * STATIC DATA AT MODULE SCOPE
 *
 * Moving data to module scope demonstrates several key concepts:
 * 1. DATA LIFTING: Moving data up to parent components
 * 2. PROPS PASSING: Parent components pass data down to children
 * 3. SEPARATION OF CONCERNS: Data management vs. UI rendering
 * 4. REUSABILITY: ChatMessages can now work with different message arrays
 */
const messages = [
  {
    id: 1,
    type: "user",
    content: "Hello! Can you help me understand React Router v7?",
  },
  {
    id: 2,
    type: "bot",
    content:
      "Of course! React Router v7 is the latest version that introduces several improvements including better data loading, enhanced nested routing, and improved TypeScript support. What specific aspect would you like to learn about?",
  },
  {
    id: 3,
    type: "user",
    content: "How do nested routes work in v7?",
  },
  {
    id: 4,
    type: "bot",
    content:
      "Nested routes in React Router v7 allow you to create hierarchical UI structures. You define parent routes that contain child routes, and use the <Outlet /> component to render child components. The parent route acts as a layout component that wraps its children.",
  },
  {
    id: 5,
    type: "user",
    content: "What's the difference between route() and layout() helpers?",
  },
  {
    id: 6,
    type: "bot",
    content:
      "Great question! The route() helper creates routes that add URL segments, while layout() creates routes that only provide UI structure without affecting the URL. Layout routes are perfect for shared components like sidebars or headers that should appear across multiple pages.",
  },
  {
    id: 7,
    type: "user",
    content: "Can you show me an example of a routes.js configuration?",
  },
  {
    id: 8,
    type: "bot",
    content:
      "Sure! Here's a basic example: You can use route(), index(), and layout() helpers to create nested route structures. The layout() function creates wrapper components, while route() adds URL segments. This approach gives you clean, hierarchical routing that's easy to maintain.",
  },
  {
    id: 9,
    type: "user",
    content: "How do I handle data loading in React Router v7?",
  },
  {
    id: 10,
    type: "bot",
    content:
      "React Router v7 provides excellent data loading capabilities through loader functions. You can define a loader function in your route component that runs before the component renders, ensuring your data is available immediately. You can access the loaded data using the useLoaderData() hook within your component.",
  },
];

/**
 * Home Component (Chat Page)
 *
 * Now demonstrates DATA FLOW and PROPS PASSING:
 * 1. LIFTING STATE UP: Data moved from child to parent component
 * 2. PROPS PASSING: Passing messages array down to ChatMessages
 * 3. COMPONENT REUSABILITY: ChatMessages can now work with any messages array
 * 4. SEPARATION OF CONCERNS: Home manages data, ChatMessages handles rendering
 */
export default function Home() {
  return (
    <main className="chat-container">
      {/* Passing messages as props - this is DATA FLOW! */}
      <ChatMessages messages={messages} />
      <ChatInput />
    </main>
  );
}
