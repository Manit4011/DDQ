import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./dashboard.scss";
import SideNavBar from "../sideNavBar/sideNavBar";
import ChatBot from "../chatbot/chatbot";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../../services/authenticate";
import FileWindow from "../fileWindow/fileWindow";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userInfo";
import { selectpage } from "../../features/chatSlice/selector";
import Grid from "../../components/TableComponent/grid";
import { selectMessages } from "../../features/messagesSlice/selector";

const App: React.FC = () => {
  const navigate = useNavigate();
  const globalMessages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false); // Sidebar collapse state
  const [isChatBotVisible, setIsChatBotVisible] = useState(true); // Visibility toggle for ChatBot
  const chat = useSelector(selectpage);

  useEffect(() => {
    if (chat.page == "chat") {
      setIsChatBotVisible(true);
    } else {
      setIsChatBotVisible(false);
    }
  }, []);

  const handleMainWindow = (tab: "chatbot" | "file-upload") => {
    if (tab === "chatbot") {
      setIsChatBotVisible(true);
    } else {
      setIsChatBotVisible(false);
    }
  };
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("session--", session);
        dispatch(
          setUser({
            username: session.attributes.name,
            user_id: session.attributes.sub,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Toggle sidebar collapse
  const handleToggleSideNav = () => {
    setIsSideNavCollapsed(!isSideNavCollapsed);
  };

  return (
    <div className="app-container">
      <div className="layout">
        <div
          className={`sidenav-dashboard-container ${
            isSideNavCollapsed ? "collapsed" : ""
          }`}
        >
          <SideNavBar
            isCollapsed={isSideNavCollapsed}
            onToggleSideNav={handleToggleSideNav}
            onTabChange={handleMainWindow}
          />
        </div>
        {/* Main content area */}
        <div className="main-content">
          {/* Header */}
          <div className="header">
            <Header />
          </div>

          {/* ChatBot */}
          {isChatBotVisible && (
            <div
              className={`chatbot-dashboard-container ${
                isSideNavCollapsed ? "expanded" : ""
              }`}
            >
              {globalMessages.gridData ? (
                <PanelGroup direction="vertical">
                  <Panel
                    style={{ overflowY: "auto" }}
                    defaultSize={50}
                    minSize={20}
                    maxSize={100}
                    className="hidden-scroll"
                  >
                    <Grid />
                  </Panel>
                  <PanelResizeHandle className="panelResize" />
                  <Panel className="hidden-scroll" minSize={20} maxSize={100}>
                    <ChatBot />
                  </Panel>
                </PanelGroup>
              ) : (
                <ChatBot />
              )}
            </div>
          )}
          {!isChatBotVisible && (
            <div
              className={`chatbot-dashboard-container ${
                isSideNavCollapsed ? "expanded" : ""
              }`}
            >
              <FileWindow />
            </div>
          )}
        </div>
        {/* {isChatBotVisible && (
          <div
            className={`chatbot-dashboard-container ${isSideNavCollapsed ? "expanded" : ""}`}
          >
            <ChatBot />
          </div>
        )} */}
        {/* Logout Button */}
        {/* <div className="logout-container">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import "./dashboard.scss";
// import SideNavBar from "../sideNavBar/sideNavBar";
// import ChatBot from "../chatbot/chatbot";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../services/authenticate";

// const Header: React.FC = () => (
//   <div className="header">
//     <h1>Dashboard Header</h1>
//   </div>
// );

// const App: React.FC = () => {
//   const navigate = useNavigate();
//   const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false); // Sidebar collapse state

//   // Handle logout
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Toggle sidebar collapse
//   const handleToggleSideNav = () => {
//     setIsSideNavCollapsed(!isSideNavCollapsed);
//   };

//   return (
//     <div className="app-container">
//       <div className="layout">
//         {/* Sidebar */}
//         <div
//           className={`side-nav-bar-container ${
//             isSideNavCollapsed ? "collapsed" : ""
//           }`}
//         >
//           <SideNavBar
//             isCollapsed={isSideNavCollapsed}
//             onToggleSideNav={handleToggleSideNav}
//           />
//         </div>

//         {/* Main content area */}
//         <div className="main-content">
//           {/* Header */}
//           <Header />

//           {/* ChatBot */}
//           <div className="chatbot-container">
//             <ChatBot />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
