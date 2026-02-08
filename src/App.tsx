import { useState, useEffect, useRef } from "react";
import { sendMessage } from "./api/chat";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { TypingIndicator } from "./components/TypingIndicator";
import "./styles/App.scss";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const reply = await sendMessage(text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "bot",
        timestamp: Date.now(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat with Raf AI</h1>
      </header>

      <main className="messages-list">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} text={msg.text} sender={msg.sender} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </main>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}

export default App;
