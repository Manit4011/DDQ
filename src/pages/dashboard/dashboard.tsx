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
            <Panel defaultSize={22} minSize={10} maxSize={25}>
              <div className="panel-content">
                <SideNavBar onFileUpload={handleFileUpload} />
              </div>
            </Panel>
          )}
          {isSideNavVisible && <PanelResizeHandle className="resize-handle" />}
          {/* ChatBot Panel */}
          {isChatBotVisible && (
            <Panel minSize={30} maxSize={100}>
              <div className="panel-content">
                <ChatBot full={fileUploaded} />
              </div>
            </Panel>
          )}

          {/* Main FileWindow Panel */}
          {/* <Panel minSize={0} maxSize={80}>
            <div className="panel-content">
              {fileUploaded ? (
                <FileWindow files={uploadedFiles} />
              ) : (
                <div className="placeholder">Upload a file to start!</div>
              )}
            </div>
          </Panel> */}
          <PanelResizeHandle className="resize-handle" />
        </PanelGroup>
      </div>
    </div>
  );
};

export default App;