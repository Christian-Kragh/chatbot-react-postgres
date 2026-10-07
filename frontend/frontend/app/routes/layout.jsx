import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";

/**
 * STATIC DATA AT MODULE SCOPE
 *
 * Moving threads data to layout demonstrates:
 * 1. DATA LIFTING: Moving data up to parent components
 * 2. PROP DRILLING: Passing data through multiple component layers
 * 3. CENTRALIZED DATA: Managing navigation data at the layout level
 * 4. COMPONENT REUSABILITY: Sidebar can work with different thread arrays
 */
const threads = [
  {
    id: 1,
    href: "/chat/how-to-learn-programming",
    title: "How to learn programming?",
  },
  {
    id: 2,
    href: "/chat/best-pizza-toppings",
    title: "What are the best pizza toppings?",
  },
  {
    id: 3,
    href: "/chat/explain-quantum-physics",
    title: "Can you explain quantum physics?",
  },
  {
    id: 4,
    href: "/chat/morning-routine-ideas",
    title: "Help me create a morning routine",
  },
  {
    id: 5,
    href: "/chat/weekend-activity-suggestions",
    title: "What should I do this weekend?",
  },
  { id: 6, href: "/chat/why-sky-blue", title: "Why is the sky blue?" },
  {
    id: 7,
    href: "/chat/learn-new-language",
    title: "How do I learn a new language?",
  },
  {
    id: 8,
    href: "/chat/meaning-of-life",
    title: "What's the meaning of life?",
  },
  { id: 9, href: "/chat/funny-joke-please", title: "Tell me a funny joke" },
  {
    id: 10,
    href: "/chat/healthy-dinner-ideas",
    title: "What's a healthy dinner idea?",
  },
  {
    id: 11,
    href: "/chat/good-book-recommendations",
    title: "Recommend me a good book",
  },
  {
    id: 12,
    href: "/chat/creative-writing-prompt",
    title: "Give me a creative writing prompt",
  },
  {
    id: 13,
    href: "/chat/fix-slow-computer",
    title: "My computer is slow, help?",
  },
  {
    id: 14,
    href: "/chat/interesting-history-fact",
    title: "Tell me an interesting history fact",
  },
];

/**
 * Layout Component
 *
 * Now demonstrates PROP DRILLING and DATA FLOW:
 * 1. DATA MANAGEMENT: Layout manages navigation threads data
 * 2. PROP DRILLING: Data flows Layout -> Sidebar -> ChatThreadsList
 * 3. CENTRALIZED CONTROL: Navigation data controlled at layout level
 * 4. COMPONENT COORDINATION: Parent coordinates data between child components
 */
export default function Layout() {
  return (
    <div className="app-layout">
      {/* Passing threads as props - starts the prop drilling chain! */}
      <Sidebar threads={threads} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
