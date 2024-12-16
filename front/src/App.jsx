import React, { useState } from "react";
import axios from "axios";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      // Make a POST request to the chatbot API
      const response = await axios.post("https://srijachatbot.vercel.app/api/chat", {
        message: input,
      });

      // Add the bot's response to the chat
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Something went wrong. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Clear the input field
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
