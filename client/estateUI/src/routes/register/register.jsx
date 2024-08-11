import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post("/auth/register", {
        username, email, password
      });
      setEmail(email);
      setShowOtpInput(true);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await apiRequest.post("/auth/verify-otp", {
        email, otp
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        {showOtpInput ? (
          <form onSubmit={handleOtpSubmit}>
            <div className="reg"><HowToRegIcon/></div>
            <h1>Verify OTP</h1>
            <input 
              name="otp" 
              type="text" 
              placeholder="Enter OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
            <button disabled={isLoading}>Verify</button>
            {error && <span>{error}</span>}
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="reg"><HowToRegIcon/></div>
            <h1>Create an Account</h1>
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="text" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
            <Link to="/login">Do you have an account? Login</Link>
            
          </form>
        )}
      </div>
      <div className="imgContainer">
        <img src="/mbg3.jpeg" alt="" />
      </div>
    </div>
  );
}

export default Register;
