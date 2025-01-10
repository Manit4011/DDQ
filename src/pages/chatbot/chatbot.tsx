import React, { useCallback, useEffect, useRef, useState } from "react";
import "./chatbot.scss";
import chatSubmit from "../../assets/icons/chat-submit-icon.svg";
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";
import {
  CHATBOT_MESSAGES,
  PLACEHOLDER_TEXT,
  ICON_ALTS,
  MAX_FILE_SIZE,
  BUTTON_LABELS,
  NO_INFO,
} from "../../constants/constant";
import ChatbotAnswer from "../../assets/icons/chatbot-answer-icon.svg";
import UserLogo from "../../assets/icons/user-logo.svg";
import UploadCross from "../../assets/icons/cross-upload.svg";
import UploadFile from "../../assets/icons/upload-file.svg";
import CircleIcon from "@mui/icons-material/Circle";
import { useDropzone } from "react-dropzone";
import Delete from "../../assets/icons/ddq-delete.svg";
import { postChat, uploadQuestionnaireFile } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userInfo/selector";
import Loader from "../../components/Loader";
import DOMPurify from "dompurify";
import { setTime } from "../../features/lastModifiedSlice";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface BotResponse {
  id: number;
  text: string;
}

const ChatBot: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [botOptions, setBotOptions] = useState<BotResponse[] | null>(null);
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
  const [isUploadSelected, setIsUploadSelected] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotOptions = (userQuestion: string) => {
    const botResponses = [
      { id: 1, text: "Option 1: This is a response." },
      { id: 2, text: "Option 2: This is another response." },
      { id: 3, text: "Option 3: Here is yet another response." },
    ];

    setBotOptions(botResponses);
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    setIsFileUploaded(true);
    setFileName(acceptedFiles[0].name);
    setFileSize((acceptedFiles[0].size / 1024).toFixed(2));
    // Process the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "text/csv": [".csv"], // CSV
      "application/pdf": [".pdf"], // PDF
      "application/vnd.ms-excel": [".xls"], // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // XLSX
    },
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((fileRejection) => {
        const { file, errors } = fileRejection;
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            alert(`File "${file.name}" is too large. Maximum size is 200 MB.`);
          }
          if (error.code === "file-invalid-type") {
            alert(
              `File "${file.name}" has an invalid format. Allowed formats: CSV, PDF, XLSX, XLS.`
            );
          }
        });
      });
    },
  });

  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };
  const formatTextToHTML = (text: string) => {
    let formattedText = text.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    formattedText = formattedText.replace(/- (.*?)(<br \/>|$)/g, "<li>$1</li>");
    formattedText = formattedText.replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>");

    return formattedText;
  };
  const scrollToBottom = () => {
    if (messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  const handleUploadIconClick = () => {
    setIsUploadSelected(!isUploadSelected);
  };

  const handleProcessClick = async () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }
    try {
      setLoading(true);
      const res = await uploadQuestionnaireFile(file, user.user_id, "");
      console.log("chat response: ", res);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const period: string = hours >= 12 ? 'PM' : 'AM';

    const formattedTime: string = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes.toString().padStart(2, '0')}${period}`;

    return `${formattedDate.replace(',', '')} at ${formattedTime}`;
}
  const handleSend = async () => {
    if (input.trim() !== "") {
      dispatch(setTime({ lastModifiedTime: formatDateTime(new Date())}));
      if (!isChatStarted) setIsChatStarted(true);
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");
      // generateBotOptions(input);
      const data = {
        user_id: user.user_id,
        conv_id: "",
        prompt: input,
      };
      try {
        setLoading(true);
        const res = await postChat(data);
        console.log("chat response: ", res);
        const botAnswer = res.response[0]?.answer;
        if (botAnswer) {
          const botMessage: Message = { text: botAnswer, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        if (res.response == null) {
          const botMessage: Message = { text: NO_INFO, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error fetching chat response:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOptionSelect = (option: BotResponse) => {
    const botMessage: Message = { text: option.text, sender: "bot" };
    setMessages([...messages, botMessage]);
    setBotOptions(null);
  };

  return (
    <div className={`chatbot-container ${isChatStarted ? "chat-started" : ""}`}>
      {loading && (
        <div className="backdrop">
          <Loader type="circle" loadercolor="primary" />
        </div>
      )}
      {!isChatStarted && (
        <>
          <div className="chatbot-heading">{CHATBOT_MESSAGES.heading}</div>
          <div className="disclaimer-text">{CHATBOT_MESSAGES.disclaimer}</div>
        </>
      )}
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className="message-bubble message">
            {message.sender === "user" ? (
              <div className="mesage-img">
                <img src={UserLogo} />
              </div>
            ) : (
              <div className="mesage-img">
                <img src={ChatbotAnswer} />
              </div>
            )}
            <div className="chat-text">
              {message.sender != "user" ? <div>Answer: </div> : ""}
              {message.sender === "bot" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(formatTextToHTML(message.text)),
                  }}
                ></div>
              ) : (
                <div>{message.text}</div>
              )}
            </div>
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
      {isFileUploaded ? (
        <>
          <div className="chatbot-input-uploaded">
            <div className="file-uploaded-heading">File Uploaded</div>
            <div className="file-uploaded-text-1">
              <span className="note-text">NOTE: </span>
              {CHATBOT_MESSAGES.uploadedDisclaimer}
            </div>
            <div className="file-uploaded-container mt-16">
              <div className="file-details-container">
                <img src={fileUploadIcon} alt="" height={20} />
                <div className="ml-10">
                  <div className="file-name">{fileName}</div>
                  <div className="file-uploaded-text-1">{fileSize} Kb</div>
                </div>
              </div>
              <div className="align-items-center">
                <button className="process-btn" onClick={handleProcessClick}>
                  {BUTTON_LABELS.process}
                </button>
                <img
                  src={Delete}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    setFile(undefined);
                    setIsFileUploaded(false);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {isUploadSelected ? (
            <div className="chatbot-input-upload" {...getRootProps()}>
              <input {...getInputProps()} className="upload-input" />
              {isDragActive ? (
                <div className="drop-files">{CHATBOT_MESSAGES.dropFiles}</div>
              ) : (
                <>
                  <div className="upload-container-1">
                    <img
                      src={UploadFile}
                      alt="upload-file"
                      height={50}
                      className="upload-file-icon"
                    />
                    <div>
                      <div className="upload-text-1">
                        {CHATBOT_MESSAGES.uploadText}
                      </div>
                      <div className="upload-text-2">
                        <span className="note-text">NOTE: </span>{" "}
                        {CHATBOT_MESSAGES.uploadDisclaimer1}{" "}
                        <CircleIcon className="circle-icon" />{" "}
                        {CHATBOT_MESSAGES.uploadDisclaimer2}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="upload-container-2">
                    <button className="browse-file-btn" onClick={() => open()}>
                      {BUTTON_LABELS.browse}
                    </button>
                    <img
                      src={UploadCross}
                      alt=""
                      height={40}
                      onClick={handleUploadIconClick}
                      className="cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="chatbot-input">
              <img
                className="file-upload-icon"
                src={fileUploadIcon}
                alt={ICON_ALTS.fileUpload}
                onClick={handleUploadIconClick}
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
          )}
        </>
      )}
    </div>
  );
};

export default ChatBot;
