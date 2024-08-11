import "./Homepage.scss";
import Searchbar from "../component/Searchbar/Searchbar.jsx";
import Footer from "../component/footer/Footer.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";



function Homepage(){

  const {currentUser} =useContext(AuthContext);
  console.log(currentUser);


    return (
        <div className="homepage">
        <div className="textContainer">
            <div className="wrapper">
            <h1 className="title"> Discover Your Dream Home with HrajEstate: Your Gateway to Extraordinary Living</h1>
            <p>
            Embark on a journey to find your perfect abode with HrajEstate, 
            where every corner holds the promise of comfort and luxury. 
            Whether you seek a cozy apartment in the heart of the city, 
            a sprawling suburban estate, or a tranquil countryside retreat, 
            we're your trusted partner in making your homeownership dreams a reality.
           
            </p>
            <Searchbar/>
            <div className="boxes">
                <div className="box">
                <h1>15+</h1>
                <h2>
                  Years of Experiences 
                </h2>
                </div>
                <div className="box">
                <h1>150</h1>
                <h2>
                  Award Gained 
                </h2>
                </div>
                <div className="box">
                <h1>1500+</h1>
                <h2>
                  Property Ready 
                </h2>
                </div>
            </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="mbg3.jpeg" alt="/"/>
        </div>
        </div>
    )
}

export default Homepage  