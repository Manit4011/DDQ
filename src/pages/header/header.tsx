import React, { useEffect } from "react";
import "./header.scss";
import HeaderTitle from "../headerTitle/headerTitle";
import LoginHeader from "../loginheader/loginHeader";
import { selectLastModified } from "../../features/lastModifiedSlice/selector";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const lastModified = useSelector(selectLastModified);
  return (
    <div className="header-container">
      <HeaderTitle />
      <div className="login-header">
        {lastModified != null && (
          <span className="time-container">{lastModified.lastModifiedTime}</span>
        )}
      <div className="separator">|</div>
      <LoginHeader />
      </div>
    </div>
  );
};

export default Header;
