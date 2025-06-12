import React, { FormEvent, useState } from "react";
import "./resetPass.scss";
import botLogo from "../../assets/images/bot-logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmForgotPassword } from "../../states/userpool";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPass: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email: string })?.email || "";

  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPassVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPass) {
      showToast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await confirmForgotPassword(email, code, password);
      showToast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      showToast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="reset-pass-container">
      <ToastContainer />
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
            <span>Enter the code sent to your email and your new password.</span>
          </div>

          <div className="label-heading">Code</div>
          <input
            placeholder="Enter verification code"
            className="form-field"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <div className="label-heading">Password</div>
          <div className="input-wrapper">
            <input
              placeholder="Enter new password"
              className="form-field-pass"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility} role="button" tabIndex={0}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <div className="label-heading">Confirm Password</div>
          <div className="input-wrapper">
            <input
              placeholder="Confirm new password"
              type={showConfirmPassword ? "text" : "password"}
              className="form-field"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={toggleConfirmPassVisibility} role="button" tabIndex={0}>
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
