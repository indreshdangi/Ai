import React from 'react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  category?: string;
}

// Helper function to detect and format code blocks
const formatMessageContent = (content: string): React.ReactNode => {
  // Check if the content likely contains code
  if (content.includes('```')) {
    const parts = content.split(/```(?:(\w+)?\n)?/);
    return (
      <>
        {parts.map((part, index) => {
          // Code blocks appear at odd indices (1, 3, 5, ...)
          if (index % 2 === 1) {
            return (
              <pre key={index} className="bg-black/20 p-3 rounded-md my-2 overflow-x-auto">
                <code className="text-white">{part}</code>
              </pre>
            );
          }
          // Regular text
          return part ? <p key={index}>{part}</p> : null;
        })}
      </>
    );
  }
  
  // If no code blocks detected, return as is
  return <p>{content}</p>;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, category }) => {
  return (
    <div className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-assistant"} shadow-xl`}>
      {!isUser && category && (
        <span className="text-xs font-bold block mb-2 text-gradient tracking-wide">{category}</span>
      )}
      {formatMessageContent(content)}
    </div>
  );
};

export default ChatMessage;
