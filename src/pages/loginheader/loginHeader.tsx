import React, { useState } from "react";
import "./loginHeader.scss";
import UserLogo from "../../assets/icons/user-logo.svg";
import { selectUser } from "../../features/userInfo/selector";
import { useDispatch, useSelector } from "react-redux";
import { revertAll } from "../../features/globalActions";
import { persistor } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authenticate";

const LoginHeader: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const cleanup = () => {
    dispatch(revertAll());
  };

  const handleLogout = () => {
    logout();
    cleanup();
    persistor.purge().then(() => {
      navigate('/login'); // Redirect to login page
    });
  };
  return (
    <div className="login-header-container">
      <img src={UserLogo} alt="User Logo" />
      <div
        className="user-name"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        {user.username}
        {isDropdownVisible && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHeader;
