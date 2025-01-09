import React, { FormEvent, useState } from 'react';
import "./forgotPass.scss";
import { useNavigate } from 'react-router-dom';
import botLogo from "../../assets/images/bot-logo.svg";

const ForgotPass: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/reset-password');
    };
  return (
    <div>
    <div className="forgot-pass-container">
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
            <span>Please enter your registered email ID below. We will send you link on it to reset the password.</span>
          </div>
          <div className="label-heading">Email ID</div>
          <input
            type="text"
            placeholder="Enter "
            className="form-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Send Link
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ForgotPass
