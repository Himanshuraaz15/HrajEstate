import { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [err, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
     // localStorage.setItem("user",JSON.stringify(res.data)); 
      //console.log(res);
      updateUser(res.data);

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
            <div className="logicon"><LoginIcon/></div>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {err && <span>{err}</span>}
          <Link to="/register">{"Don't"} you have an account? Signup</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/mbg3.jpeg" alt="" />
      </div>
    </div>
  );
}

export default Login;