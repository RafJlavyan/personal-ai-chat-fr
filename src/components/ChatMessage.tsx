import "../styles/ChatMessage.scss";

interface ChatMessageProps {
  text: string;
  sender: "user" | "bot";
}

export const ChatMessage = ({ text, sender }: ChatMessageProps) => {
  return (
    <div className={`message-wrapper ${sender}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};
