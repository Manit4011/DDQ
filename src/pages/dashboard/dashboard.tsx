// import React, { useState } from "react";
// import "./dashboard.scss";
// import SideNavBar from "../sideNavBar/sideNavBar";
// import FileWindow from "../fileWindow/fileWindow";
// import ChatBot from "../chatbot/chatbot";

// const App: React.FC = () => {
//   const [isSideNavVisible, setIsSideNavVisible] = useState(true);
//   const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [isChatBotVisible, setIsChatBotVisible] = useState(true);

//   const toggleSideNav = () => {
//     setIsSideNavVisible(!isSideNavVisible);
//   };

//   const handleFileUpload = (file: File | null) => {
//     setUploadedFiles(file);
//     setFileUploaded(true);
//   };

//   const toggleChatBot = () => {
//     setIsChatBotVisible(!isChatBotVisible);
//   };

//   return (
//     <div className="app-container">
//       {isSideNavVisible && <SideNavBar onFileUpload={handleFileUpload} />}
//       <button
//         className={`toggle-sidenav-button ${
//           isSideNavVisible ? "open" : "closed"
//         }`}
//         onClick={toggleSideNav}
//       >
//         {isSideNavVisible ? "Hide Sidebar" : "Show Sidebar"}
//       </button>

//       {fileUploaded ? (
//         <>
//           <FileWindow files={uploadedFiles} />
//         </>
//       ) : (
//         <></>
//       )}
//         {isChatBotVisible && <ChatBot full={fileUploaded} />}
//         <button
//           className={`toggle-chatbot-button ${isChatBotVisible ? "open" : "closed"}`}
//           onClick={toggleChatBot}
//         >
//           {isChatBotVisible ? "Hide ChatBot" : "Show ChatBot"}
//         </button>
//     </div>
//   );
// };

// export default App;



import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./dashboard.scss";
import SideNavBar from "../sideNavBar/sideNavBar";
import FileWindow from "../fileWindow/fileWindow";
import ChatBot from "../chatbot/chatbot";

const App: React.FC = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isChatBotVisible, setIsChatBotVisible] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedFiles(file);
    setFileUploaded(true);
  };

  const toggleChatBot = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  return (
    <div className="app-container">
      <div className="layout">
        <PanelGroup direction="horizontal">
          {/* Sidebar Panel */}
          {isSideNavVisible && (
            <Panel defaultSize={20} minSize={0} maxSize={20}>
              <div className="panel-content">
                <SideNavBar onFileUpload={handleFileUpload} />
              </div>
            </Panel>
          )}
          {isSideNavVisible && <PanelResizeHandle className="resize-handle" />}

          {/* Main FileWindow Panel */}
          <Panel minSize={0} maxSize={80}>
            <div className="panel-content">
              {fileUploaded ? (
                <FileWindow files={uploadedFiles} />
              ) : (
                <div className="placeholder">Upload a file to start!</div>
              )}
            </div>
          </Panel>
          <PanelResizeHandle className="resize-handle" />

          {/* ChatBot Panel */}
          {isChatBotVisible && (
            <Panel defaultSize={20} minSize={10} maxSize={60}>
              <div className="panel-content">
                <ChatBot full={fileUploaded} />
              </div>
            </Panel>
          )}
        </PanelGroup>

        {/* Toggle Buttons */}
        <button
          className={`toggle-sidenav-button ${isSideNavVisible ? "open" : "closed"}`}
          onClick={toggleSideNav}
        >
          {isSideNavVisible ? "Hide Sidebar" : "Show Sidebar"}
        </button>

        <button
          className={`toggle-chatbot-button ${isChatBotVisible ? "open" : "closed"}`}
          onClick={toggleChatBot}
        >
          {isChatBotVisible ? "Hide ChatBot" : "Show ChatBot"}
        </button>
      </div>
    </div>
  );
};

export default App;


