import { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotPass.scss";
import apiRequest from "../../lib/apiRequest";

function ForgotPass() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await apiRequest.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await apiRequest.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="forgotPass">
      <div className="formContainer">
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <h1>Forgot Password</h1>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
            {err && <span className="error">{err}</span>}
            {message && <span className="message">{message}</span>}
            <Link to="/login">Back to Login</Link>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit}>
            <h1>Reset Password</h1>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
            {err && <span className="error">{err}</span>}
            {message && <span className="message">{message}</span>}
            <Link to="/login">Back to Login</Link>
          </form>
        )}
      </div>
      <div className="imgContainer">
        <img src="/mbg3.jpeg" alt="" />
      </div>
    </div>
  );
}

export default ForgotPass;
