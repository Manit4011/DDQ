import React, { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./login.scss";
import botLogo from "../../assets/images/bot-logo.svg";
import crossIcon from "../../assets/icons/red-cross-ddq.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authenticate } from "../../services/authenticate";
import userpool from "../../states/userpool";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [loginErr,setLoginErr]=useState('');

    useEffect(() => {
    const isAuthenticated = Boolean(sessionStorage.getItem("access-token"));
    if (isAuthenticated) {
      console.log("inside if user", isAuthenticated);
      navigate('/dashboard');
    }
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const validation = (): Promise<{
    email: string;
    password: string;
    confirmPass?: string;
  }> => {
    return new Promise((resolve, reject) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "" && password === "") {
        setEmailErr("Email is Required");
        setPassErr("Password is required");
        resolve({
          email: "Email is Required",
          password: "Password is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (!emailRegex.test(email)) {
        setEmailErr("Invalid email address");
        resolve({ email: "Invalid email address", password: "" });
      } else if (password === "") {
        setPassErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      }
      // If all validations pass
      else {
        resolve({ email: "", password: "", confirmPass: "" });
      }

      reject(""); // If for any reason none of the conditions match
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailErr("");
    setPassErr("");
    validation()
      .then(
        (res) => {
          if(res.email === '' && res.password === ''){
            authenticate(email,password).then((data)=>{
              setLoginErr('');
              console.log(data);
              navigate('/dashboard');
              sessionStorage.setItem('access-token',data.getAccessToken().getJwtToken())
            },(err)=>{
              console.log(err);
              setLoginErr(err.message);
            }).catch(err=> console.log(err))
          }
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err));
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
              id="email"
              className="form-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailErr? <span className="text-danger">{emailErr}</span>: ''}
            <div className="label-heading">Password</div>
            <div className="input-wrapper">
              <input
                placeholder="Enter"
                className="form-field-pass"
                id="password"
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
            {passErr? <span className="text-danger">{passErr}</span> : ''}
            {loginErr? <span className="text-danger-1">{loginErr}</span>: ''}
            <div className="forgot-pass-option-container">
              {/* <div className="wrong-pass"><img src={crossIcon} alt="" /> Wrong Password</div> */}
              <div className="forgot-pass" onClick={handleForgotPass}>
                Forgot Password?
              </div>
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
