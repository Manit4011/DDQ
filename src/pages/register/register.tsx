import React, { FormEvent, useEffect, useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import botLogo from "../../assets/images/bot-logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import userpool from "../../states/userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import CommonModal from "../commonModal/commonModal";
import { EMAIL_REGEX, PASS_REGEX, REGISTERED_MESSAGE } from "../../constants/constant";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice/selector";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const authInfo = useSelector(selectAuth);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [nameErr,setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const isAuthenticated = Boolean(authInfo.access);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authInfo.access, navigate]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const validation = (): Promise<{
    name: string,
    email: string;
    password: string;
    confirmPass?: string;
  }> => {
    return new Promise((resolve, reject) => {
      const emailRegex = EMAIL_REGEX;
      const passwordRegex = PASS_REGEX;
      if (email === "" && password === "" && name === "") {
        setEmailErr("Email is required");
        setPassErr("Password is required");
        setNameErr("Name is required");
        resolve({
          email: "Email is required",
          password: "Password is required",
          name: "Name is required",
        });
      } else if(name === ""){
        setNameErr("Name is required");
        resolve({ name: "Name is required", email: "", password: "" });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({name: "", email: "Email is Required", password: "" });
      } else if (!emailRegex.test(email)) {
        setEmailErr("Invalid email address");
        resolve({ name: "", email: "Invalid email address", password: "" });
      } else if (password === "") {
        setPassErr("Password is required");
        resolve({name: "", email: "", password: "Password is required" });
      } else if (!passwordRegex.test(password)) {
        setPassErr("Invalid Password");
        resolve({
          name: "",
          email: "",
          password: "Invalid Password",
        });
      } else if (confirmPass !== password) {
        setConfirmPassErr("Passwords do not match");
        resolve({
          name: "",
          email: "",
          password: "",
          confirmPass: "Passwords do not match",
        });
      }
      // If all validations pass
      else {
        resolve({name: "", email: "", password: "", confirmPass: "" });
      }

      reject(""); // If for any reason none of the conditions match
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameErr("");
    setEmailErr("");
    setPassErr("");
    validation()
      .then(
        (res) => {
          if (
            res.name === "" &&
            res.email === "" &&
            res.password === "" &&
            res.confirmPass === ""
          ) {
            const attributeList: CognitoUserAttribute[] = [];
            attributeList.push(
              new CognitoUserAttribute({
                Name: "email",
                Value: email,
              })
            );
            attributeList.push(
              new CognitoUserAttribute({
                Name: "name",
                Value: name, 
              })
            );
            userpool.signUp(email, password, attributeList, [], (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(data);
              setOpenModal(true); // Open modal on success
            });
          }
        },
        (err) => console.error(err)
      )
      .catch((err) => console.error(err));
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
          <div className="label-heading">Full Name</div>
          <input
            type="text"
            placeholder="Enter "
            id="name"
            className="form-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameErr ? <span className="text-danger">{nameErr}</span> : ""}
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
          {emailErr ? <span className="text-danger">{emailErr}</span> : ""}
          <div className="label-heading">Password</div>
          <div className="input-wrapper">
            <input
              placeholder="Enter"
              id="password"
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
          {passErr ? <span className="text-danger">{passErr}</span> : ""}
          <div className="label-heading">Confirm Password</div>
          <div className="input-wrapper">
            <input
              placeholder="Enter "
              id="confirmPass"
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
          {confirmPassErr ? (
            <span className="text-danger">{confirmPassErr}</span>
          ) : (
            ""
          )}
          <button type="submit" className="submit-button">
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
      {openModal && <CommonModal closeModal={setOpenModal} message={REGISTERED_MESSAGE} title="Account Created!" type="auth"/>}
    </div>
  );
};

export default Register;
