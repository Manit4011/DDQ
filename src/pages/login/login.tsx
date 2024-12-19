import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import botLogo from "../../assets/images/bot-logo.svg";
import crossIcon from '../../assets/icons/red-cross-ddq.svg';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegisterClick = () => {
    navigate("/");
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleForgotPass = () => {
    navigate("/forgot-password");
  };
  return (
    <div>
      <div className="login-container">
        <div className="left-section">
          <div className="bot-logo">
            <img src={botLogo} alt="" width={50} height={50} />
            <span className="bold-text">DDQ</span>
            <span className="normal-text">chatbot</span>
          </div>
        </div>
        <div className="right-section">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-heading">Login</div>
            <div className="label-heading">Email ID</div>
            <input
              type="text"
              placeholder="Enter "
              className="form-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="label-heading">Password</div>
            <div className="input-wrapper">
              <input
                placeholder="Enter"
                className="form-field-pass"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
                role="button"
                tabIndex={0}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            <div className="forgot-pass-option-container">
              {/* <div className="wrong-pass"><img src={crossIcon} alt="" /> Wrong Password</div> */}
              <div className="forgot-pass" onClick={handleForgotPass}>Forgot Password?</div>
            </div>
            <button type="submit" className="submit-button-login">
              Login
            </button>
            <div className="bottom-disclaimer">
              <span>Don't have an account?</span>
              <span className="login-text" onClick={handleRegisterClick}>
                Register
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
