import React, { useRef, useState } from "react";
import "./sideNavBar.scss";
import { useNavigate } from 'react-router-dom';
import botLogo from "../../assets/images/bot-logo.svg";
import botIcon from "../../assets/icons/sidenav-bot.svg";
import fileUploadIcon from "../../assets/icons/sidenav-file-icon.svg";
import sidenavShowIcon from "../../assets/icons/arrow-right-icon.svg";

interface SideNavBarProps {
  onFileUpload: (file: File | null) => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"chatbot" | "file-upload">("chatbot"); 
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUploadClick = () => {
    if (!uploadedFile) {
      fileInputRef.current?.click();
    }
  };
  const handleNavigation = (tab: "chatbot" | "file-upload", path: string) => {
    setActiveTab(tab);
    // navigate(path); 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      onFileUpload(file);
    }
  };
  const handleRemoveFile = () => {
    setFileName("");
    setUploadedFile(null);
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="side-nav-bar">
      <div className="bot-logo">
        <img src={botLogo} alt="ChatBot Logo" width={50} height={50} />
        <span className="bold-text">DDQ</span>
        <span className="normal-text">chatbot</span>
      </div>
      <div className="sidenav-options-container">
        <div className="sidenav-option" onClick={() => handleNavigation("chatbot", "/chatbot")}>
          <div className="sidenav-text">
            <i className="icon-chatbot">
              <img src={botIcon} alt="" />
            </i>
            <div>ChatBot</div>
          </div>
        {activeTab === "chatbot" ? <div >
          <img src={sidenavShowIcon} alt="" />
        </div> : <div></div>}
        </div>
        <div className="sidenav-option" onClick={() => handleNavigation("file-upload", "/file-upload")}>
          <div className="sidenav-text">
          <i className="icon-file">
            <img src={fileUploadIcon} alt="" />
          </i>
          <div>File Upload and Processing</div>
          </div>
          {activeTab === "file-upload" ? <div >
          <img src={sidenavShowIcon} alt="" />
        </div> : <div></div>}
        </div>
      </div>
    </div>
    //   <div className="upload-file">
    //   <h2>Upload Questionnaire Excel</h2>
    //   <div className="file-upload-box" onClick={handleFileUploadClick}>
    //     <input
    //       type="file"
    //       ref={fileInputRef}
    //       style={{ display: 'none' }}
    //       onChange={handleFileChange}
    //       accept=".pdf, .xlsx, .csv, .docx"
    //     />
    //     {uploadedFile ? (
    //       <div className="file-info">
    //         <span className="file-name">{fileName}</span>
    //         <button className="remove-file-button" onClick={handleRemoveFile}>
    //           ✖
    //         </button>
    //       </div>
    //     ) : (
    //       <label htmlFor="file-input" className="file-input-label">
    //         <div className="upload-icon">📁</div>
    //         <span>Drag and drop a file here or click to browse</span>
    //         <p className="limit">Limit 200MB per file • PDF, XLSX, CSV, DOCX</p>
    //       </label>
    //     )}
    //   </div>
    //   {!uploadedFile && (
    //     <button className="upload-button" onClick={handleFileUploadClick}>
    //       Upload File
    //     </button>
    //   )}
    // </div>
  );
};

export default SideNavBar;
