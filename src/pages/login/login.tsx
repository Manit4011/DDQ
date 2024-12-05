import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
    setLoading(true);
    setError("");

    const fakeAuth = { password: "password123" };

    if (password === fakeAuth.password) {
      setTimeout(() => {
        alert("Login successful!");
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Invalid email or password");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <h2>Please enter the password to access the Central Repository</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Background particles */}
      {[...Array(10)].map((_, index) => (
        <div className="particle" key={index}></div>
      ))}
    </div>
  );
};

export default Login;
