import React, { useState } from "react";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const response = await fetch("https://chatbot-two-green.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    const botMessage = { sender: "bot", text: data.response };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="flex p-4 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 border rounded-lg outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
