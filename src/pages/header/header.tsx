import React, { useState } from "react";
import "./header.scss";
import HeaderTitle from "../headerTitle/headerTitle";
import LoginHeader from "../loginheader/loginHeader";
import { selectLastModified } from "../../features/lastModifiedSlice/selector";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../assets/icons/ddq-delete.svg";
import { selectMessages } from "../../features/messagesSlice/selector";
import { deleteChat } from "../../features/messagesSlice";
import Tooltip from "@mui/material/Tooltip";
import CommonModal from "../commonModal/commonModal";
import { DELETE_MESSAGE } from "../../constants/constant";
import { resetLastModified } from "../../features/lastModifiedSlice";
import { setPageSize } from "../../features/chatSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const globalMessages = useSelector(selectMessages);
  const lastModified = useSelector(selectLastModified);
  const [openModal, setOpenModal] = useState(false);
  const handleDeleteClick = () => {
    setOpenModal(true);
  }
  const handleClearChat = () =>{
    dispatch(deleteChat());
    dispatch((resetLastModified()));
    dispatch(setPageSize('expanded'));
  }
  return (
    <div className="header-container">
      <HeaderTitle />
      <div className="login-header">
        {lastModified !== null && (
          <span className="time-container">{lastModified.lastModifiedTime}</span>
        )}
        {(globalMessages.gridData || globalMessages.messages.length !== 0) && (
          <Tooltip title="Clear chat" placement="bottom">
            <span className="clear-chat-icon"><img src={Delete} alt="" height={18} onClick={handleDeleteClick} /></span>
          </Tooltip>
        )}
      <div className="separator">|</div>
      <LoginHeader />
      </div>
      {openModal && 
      (
        <div className="delete-modal">
          <CommonModal onConfirm={handleClearChat} closeModal={setOpenModal} message={DELETE_MESSAGE} title="Delete" type="delete"/>
        </div>
      )}
    </div>
  );
};

export default Header;
