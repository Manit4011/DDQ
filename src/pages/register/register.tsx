import React, { FormEvent, useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import botLogo from "../../assets/images/bot-logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // navigate("/dashboard");
    // setLoading(true);
    // setError("");

    // const fakeAuth = { password: "password123" };

    // if (password === fakeAuth.password) {
    //   setTimeout(() => {
    //     alert("Login successful!");
    //     setLoading(false);
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     setError("Invalid email or password");
    //     setLoading(false);
    //   }, 1000);
    // }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <div className="bot-logo">
          <img src={botLogo} alt="" width={50} height={50} />
          <span className="bold-text">DDQ</span>
          <span className="normal-text">chatbot</span>
        </div>
      </div>
      <div className="right-section">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-heading">Register</div>
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
          <button type="submit" className="submit-button" disabled={loading}>
            Register
          </button>
          <div className="bottom-disclaimer">
            <span>Already have an account?</span>
            <span className="login-text" onClick={handleLoginClick}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
    //     <button type="submit" disabled={loading}>
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
  );
};

export default Register;
