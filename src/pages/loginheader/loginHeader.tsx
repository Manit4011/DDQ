import React from "react";
import "./loginHeader.scss";
import UserLogo from "../../assets/icons/user-logo.svg";

const LoginHeader: React.FC = () => {
  return (
    <div className="login-header-container">
      <img src={UserLogo} alt="" />
      <div className="user-name">Mehhul Garg</div>
    </div>
  );
};

export default LoginHeader;
