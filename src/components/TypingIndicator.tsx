import "../styles/TypingIndicator.scss";

export const TypingIndicator = () => {
  return (
    <div className="message-wrapper bot">
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
};
