import { useState, useContext } from "react";
import "./Navbar.scss";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BoyIcon from '@mui/icons-material/Boy';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);



  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/realh.jpeg" alt="HRajEstate logo" />
          <span>HRajEstate</span>
        </Link>
        <Link to="/">Home</Link>
        {!currentUser ? (
            <Link to="/login"> About</Link>
          ):(
            <>
              <Link to="/profile">About</Link>
            </>
          )}
        <Link to="/contact">Contact</Link>
        <Link to="/list">Lists</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img  src={currentUser.avatar || "/noavatar.png"} alt=""/>
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="login">Log in</Link>
            <Link to="/register" className="register">Sign up</Link>
          </>
        )}
        <div className="menuIcon">
          <img src="menu2.jpeg" alt="Menu Icon" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/"><HomeIcon /> Home</Link>
          <Link to="/profile"><PersonIcon /> About</Link>
          <Link to="/"><PhoneIphoneIcon /> Contact</Link>
          <Link to="/"><BoyIcon /> Agents</Link>
          {currentUser ? (
            <Link to="/logout"><LogoutIcon /> Log out</Link>
          ) : (
            <>
              <Link to="/login"><LoginIcon /> Log in</Link>
              <Link to="/register"><LogoutIcon /> Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
