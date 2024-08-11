import "./Layout.scss";
import Navbar from "../../component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


 function Layout(){
    return(
        <div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>

        <div className="content">
        <Outlet/>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    )
}

 function RequireAuth(){
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };