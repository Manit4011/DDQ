import React, { useEffect, useRef, useState } from "react";
import "./sideNavBar.scss";
import botLogo from "../../assets/images/bot-logo.svg";
import botIcon from "../../assets/icons/sidenav-bot.svg";
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";
import sidenavShowIcon from "../../assets/icons/arrow-right-icon.svg";
import openSidenav from "../../assets/icons/open-arrow.svg";
import closeSidenav from "../../assets/icons/close-arrow.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/chatSlice';
import { selectpage } from '../../features/chatSlice/selector';

interface SideNavBarProps {
  onToggleSideNav: () => void;
  isCollapsed: boolean;
  onTabChange: (tab: "chatbot" | "file-upload") => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  onToggleSideNav,
  isCollapsed,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<"chatbot" | "file-upload">(
    "chatbot"
  );
  const dispatch = useDispatch();
  const chatWindow= useSelector(selectpage); 

  useEffect(()=>{
    if(chatWindow.page === 'chat'){
      setActiveTab('chatbot');
    }else{
      setActiveTab('file-upload');
    }
  },[chatWindow.page])


  const handleNavigation = (tab: "chatbot" | "file-upload") => {
    setActiveTab(tab);
    onTabChange(tab);
    if(tab === "chatbot"){
      dispatch(setPage('chat'));
    }
    else{
      dispatch(setPage('file'));
    }
  };

  return (
    <div className={`side-nav-bar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="bot-logo">
        <img src={botLogo} alt="ChatBot Logo" width={50} height={50} />
        {!isCollapsed && (
          <>
            <span className="bold-text">DDQ</span>
            <span className="normal-text">chatbot</span>
          </>
        )}
      </div>
      <div className="sidenav-options-container">
        <div
          className="sidenav-option"
          onClick={() => handleNavigation("chatbot")}
        >
          <div className="sidenav-text">
            <i className="icon-chatbot">
              <img src={botIcon} alt="" />
            </i>
            {!isCollapsed && <div>ChatBot</div>}
          </div>
          {activeTab === "chatbot" && !isCollapsed && (
            <div>
              <img src={sidenavShowIcon} alt="" />
            </div>
          )}
        </div>
        <div
          className="sidenav-option"
          onClick={() => handleNavigation("file-upload")}
        >
          <div className="sidenav-text">
            <i className="icon-file">
              <img src={fileUploadIcon} alt="" />
            </i>
            {!isCollapsed && <div>File Upload and Processing</div>}
          </div>
          {activeTab === "file-upload" && !isCollapsed && (
            <div>
              <img src={sidenavShowIcon} alt="" />
            </div>
          )}
        </div>
      </div>

      <button
        className="toggle-arrow-button"
        onClick={onToggleSideNav} // Pass this function from the parent
      >
        <i className="arrow-icon">{isCollapsed ? <img src={openSidenav} alt="" /> : <img src={closeSidenav} alt="" />}</i>
      </button>
    </div>
  );
};

export default SideNavBar;
