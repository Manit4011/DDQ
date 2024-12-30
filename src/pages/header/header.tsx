import React from "react";
import "./header.scss";
import HeaderTitle from "../headerTitle/headerTitle";
import LoginHeader from "../loginheader/loginHeader";

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <HeaderTitle />
      <div className="login-header">
      <div className="separator">|</div>
      <LoginHeader />
      </div>
    </div>
  );
};

export default Header;
