import "./Footer.scss";
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';

export default function Footer(){
    return(
        <div className="Footer">
            <div className="rights">
            All Rights Reserved. © Copyright 2024 HRajEstate Realty Services Limited.
            </div>
            <div className="socials">
                <span >
                    <a href="#" className="twitter"><XIcon/></a>
                    </span>
                <span>
                    <a href="#" className="facebook"><FacebookIcon/></a>
                </span>
                <span>
                    <a href="#" className="insta"><InstagramIcon/></a>
                </span>
                <span>
                    <a href="#" className="linkedin"><LinkedInIcon/></a>
                </span>
            <div className="contacts">
                <span><a href="#"><EmailIcon/></a>
                <br></br>
                himanshunraj12@gmail.com
                </span>
                <span>
                    <a href="#"><LocalPhoneIcon/></a>
                    <br></br>
                    +91-8877290420
                </span>
                <span><a href="https://www.google.com/maps/place/Bengaluru+Airport+Lounge/@13.2008511,77.7061611,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1d7d2ff13d91:0xfabef75907bc4f1e!8m2!3d13.2008459!4d77.708736!16s%2Fg%2F11swqrc9lq?entry=ttu"><ApartmentIcon/></a>
                <br></br>
                Address
                </span>
                </div>
                <div/>
            </div>
        </div>
    )
}