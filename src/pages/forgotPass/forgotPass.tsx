import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import botLogo from "../../assets/images/bot-logo.svg";
import "./forgotPass.scss";
import { showToast } from "../../utils/toast";
import { initiateForgotPassword } from "../../states/userpool";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await initiateForgotPassword(email.trim());
      showToast.success("Password reset code sent to your email.");
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      if (err.code === "LimitExceededException") {
        showToast.error(
          "Too many attempts. Please try again in a few minutes."
        );
      } else if (
        err.message?.includes("no registered/verified email or phone_number") ||
        err.code === "UserNotFoundException"
      ) {
        showToast.error("Email not found or not verified.");
      } else {
        showToast.error(err.message || "Failed to send reset link.");
      }
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-pass-container">
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
          <div className="form-heading">Forgot Password</div>
          <div className="top-disclaimer">
            <span>
              Please enter your registered email ID below. We will send you a
              link to reset your password.
            </span>
          </div>
          <div className="label-heading">Email ID</div>
          <input
            type="email"
            placeholder="Enter "
            className="form-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Sending..." : "Send Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
