const ChatMessage = ({ sender, text }) => {
    const isUser = sender === "user";
    return (
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } my-2 px-2`}
      >
        <div
          className={`rounded-lg p-3 max-w-xs ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {text}
        </div>
      </div>
    );
  };
  
  export default ChatMessage;
  