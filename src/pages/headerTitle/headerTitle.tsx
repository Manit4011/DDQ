import React, { useEffect, useRef, useState } from "react";
import "./headerTitle.scss";
import EditIcon from "../../assets/icons/ddq-edit.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setChatName } from "../../features/chatSlice";
import { selectpage } from "../../features/chatSlice/selector";
import Tooltip from "@mui/material/Tooltip";

const HeaderTitle: React.FC = () => {
  const [localChatName, setLocalChatName] = useState<string>("Chatbot");
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const windowName = useSelector(selectpage);

  useEffect(() => {
    setLocalChatName(
      windowName.page == "chat" ? "Chatbot" : "File Upload & Processing"
    );
    dispatch(
      setChatName(
        windowName.page == "chat" ? "Chatbot" : "File Upload & Processing"
      )
    );
  }, [windowName.page]);

  const handleEditClick = () => {
    setIsChatDisabled(true); // Enable the input
    setTimeout(() => {
      inputRef.current?.focus(); // Auto-focus the input after enabling
    }, 0); // Ensure focus is applied after state update
  };
  const handleDoneClick = () => {
    setIsChatDisabled(false);
    dispatch(setChatName(localChatName));
  };
  return (
    <div className="header-box">
      <div className="input-box">
        <input
          type="text"
          ref={inputRef}
          value={localChatName}
          onChange={(e) => setLocalChatName(e.target.value)}
          className="header-input"
          disabled={!isChatDisabled}
        />
      </div>
      {!isChatDisabled ? (
        <Tooltip title="Edit" placement="bottom">
          <button className="edit-btn" onClick={handleEditClick}>
            <img src={EditIcon} alt="" height={15} />
          </button>
        </Tooltip>
      ) : (
        <button className="done-btn" onClick={handleDoneClick}>
          <CheckCircleIcon />
        </button>
      )}
    </div>
  );
};

export default HeaderTitle;
