import React, { useState } from "react";
import "./chatbot.scss";
import chatSubmit from "../../assets/icons/chat-submit-icon.svg";
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";
import {
  CHATBOT_MESSAGES,
  PLACEHOLDER_TEXT,
  ICON_ALTS,
} from "../../constants/constant";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface BotResponse {
  id: number;
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [botOptions, setBotOptions] = useState<BotResponse[] | null>(null);
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false);

  const generateBotOptions = (userQuestion: string) => {
    const botResponses = [
      { id: 1, text: "Option 1: This is a response." },
      { id: 2, text: "Option 2: This is another response." },
      { id: 3, text: "Option 3: Here is yet another response." },
    ];

    setBotOptions(botResponses);
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      if (!isChatStarted) setIsChatStarted(true);
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");
      generateBotOptions(input);
    }
  };

  const handleOptionSelect = (option: BotResponse) => {
    const botMessage: Message = { text: option.text, sender: "bot" };
    setMessages([...messages, botMessage]);
    setBotOptions(null);
  };

  return (
    <div className={`chatbot-container ${isChatStarted ? "chat-started" : ""}`}>
      {!isChatStarted && (
        <>
          <div className="chatbot-heading">{CHATBOT_MESSAGES.heading}</div>
          <div className="disclaimer-text">
          {CHATBOT_MESSAGES.disclaimer}
          </div>
        </>
      )}
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
        <img
          className="file-upload-icon"
          src={fileUploadIcon}
          alt={ICON_ALTS.fileUpload}
          height={20}
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={PLACEHOLDER_TEXT}
          className="chatbot-input-field"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={input.trim() === ""}
          className="chat-submit"
        >
          <img src={chatSubmit} alt={ICON_ALTS.send} height={34} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
