import React, { useState } from "react";
import "./chatbot.scss";
import chatSubmit from '../../assets/icons/chat-submit-icon.svg'
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface BotResponse {
  id: number;
  text: string;
}
interface ChatBotProps {
  full: boolean;
}
const ChatBot: React.FC<ChatBotProps> = ({ full }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [botOptions, setBotOptions] = useState<BotResponse[] | null>(null);

  const generateBotOptions = (userQuestion: string) => {
    // Example logic to generate bot options based on the user's question
    const botResponses = [
      { id: 1, text: "Option 1: This is a response." },
      { id: 2, text: "Option 2: This is another response." },
      { id: 3, text: "Option 3: Here is yet another response." },
    ];

    setBotOptions(botResponses);
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");
      generateBotOptions(input); // Trigger bot response options based on user question
    }
  };

  const handleOptionSelect = (option: BotResponse) => {
    const botMessage: Message = { text: option.text, sender: "bot" };
    setMessages([...messages, botMessage]);
    setBotOptions(null); // Hide bot options after selecting one
  };

  return (
    // className={`chat-window ${isFullWidth ? 'full-width' : 'half-width'}`}
    <div className={`chatbot-container`}>
      <h2>Chatbot</h2>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}

        {botOptions && (
          <div className="bot-options">
            {botOptions.map((option) => (
              <button
                key={option.id}
                className="bot-option"
                onClick={() => handleOptionSelect(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question"
        />
        <img src={fileUploadIcon} alt="" height={16} />
        <button onClick={handleSend} disabled={input.trim() === ""} className="chat-submit">
          <img src={chatSubmit} alt=""  height={40}/>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
