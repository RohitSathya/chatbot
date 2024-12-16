const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// Define rules for various user queries
const predefinedResponses = {
  hello: "Hi there! How can I assist you today?",
  help: `Here are some things you can ask me:
  - "Tell me about your services."
  - "How do I reset my password?"
  - "What are your working hours?"
  - "Contact support team."`,
  services: "We provide 24/7 customer support, product assistance, and troubleshooting.",
  "reset password": "To reset your password, visit the settings page and click 'Forgot Password.'",
  "working hours": "Our working hours are 9 AM to 6 PM, Monday to Friday.",
  "contact support": "You can contact our support team at support@example.com or call us at +123-456-7890.",
};

// Get response based on input message
const getBotResponse = (message) => {
  // Search for matching keywords in the user's message
  for (let [key, response] of Object.entries(predefinedResponses)) {
    if (message.toLowerCase().includes(key)) {
      return response;
    }
  }
  // Default response if no match is found
  return "I'm here to help. Can you clarify your query?";
};

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Get bot's response using the rule-based system
  const botResponse = getBotResponse(message);

  // Save the conversation to the database
  const chatEntry = new Chat({
    userMessage: message,
    botResponse,
  });

  try {
    await chatEntry.save();
    res.json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ error: "Failed to save chat history." });
  }
});

module.exports = router;
