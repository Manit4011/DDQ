import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import botLogo from "../../assets/images/bot-logo.svg";
import "./verifyUser.scss";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  confirmUserRegistration,
  resendConfirmationCode,
} from "../../states/userpool";

const VerifyUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60); // seconds
  const [canResend, setCanResend] = useState(false);

  // Get email passed via navigation state
  const email = location.state?.email;
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    } else if (resendCooldown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, canResend]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      showToast.error("Email not found. Please register again.");
      return;
    }

    setLoading(true);
    try {
      await confirmUserRegistration(email, code);
      showToast.success("Verification successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      showToast.error(err.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (!email) {
      showToast.error("Email not found. Please register again.");
      return;
    }
    try {
      await resendConfirmationCode(email);
      showToast.success("A new verification code has been sent to your email.");
      setCanResend(false);
      setResendCooldown(60); // restart cooldown
    } catch (err: any) {
      showToast.error(err.message || "Failed to resend code.");
    }
  };

  return (
    <div className="verify-user-container">
      <ToastContainer />
      <div className="left-section">
        <div className="bot-logo">
          <img src={botLogo} alt="Bot Logo" width={50} height={50} />
          <span className="bold-text">DDQ</span>
          <span className="normal-text">chatbot</span>
        </div>
      </div>
      <div className="right-section">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-heading">Account Verification</div>
          <div className="top-disclaimer">
            <span>
              A 6-digit verification code has been sent to your email:{" "}
              <b>{email}</b>
            </span>
          </div>
          <div className="label-heading">Enter Verification Code</div>
          <input
            type="text"
            placeholder="6-digit code"
            className="form-field"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <div className="resend-code-section">
            <button
              type="button"
              className="resend-button"
              onClick={handleResend}
              disabled={!canResend}
            >
              {canResend ? "Resend Code" : `Resend in ${resendCooldown}s`}
            </button>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
