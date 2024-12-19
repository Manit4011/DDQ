import React, { FormEvent, useState } from "react";
import "./resetPass.scss";
import { useNavigate } from "react-router-dom";
import botLogo from "../../assets/images/bot-logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPass: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };
  return (
    <div>
      <div className="reset-pass-container">
        <div className="left-section">
          <div className="bot-logo">
            <img src={botLogo} alt="" width={50} height={50} />
            <span className="bold-text">DDQ</span>
            <span className="normal-text">chatbot</span>
          </div>
        </div>
        <div className="right-section">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-heading">Reset Password</div>
            <div className="top-disclaimer">
              <span>
              Please enter your new password & confirm it.
              </span>
            </div>
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
          <div className="label-heading">Confirm Password</div>
          <div className="input-wrapper">
            <input
              placeholder="Enter "
              type={showConfirmPassword ? "text" : "password"}
              className="form-field"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={toggleConfirmPassVisibility}
              role="button"
              tabIndex={0}
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
