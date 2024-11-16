import React from 'react'
import Marquee from "react-fast-marquee";

import partner1 from "../../assets/images/client-logos/partner1.png"
import partner2 from "../../assets/images/client-logos/partner2.png"
import partner3 from "../../assets/images/client-logos/partner3.png"
import partner4 from "../../assets/images/client-logos/partner4.png"
import partner5 from "../../assets/images/client-logos/partner5.png"
import SlideUp from '../../utlits/animations/slideUp';
import jarvis from "../../assets/images/client-logos/download.png"
import { Link } from 'react-router-dom'
const Partners = () => {

    const companies = [
        { id: 'google', name: 'Google', logo: jarvis },
        { id: 'facebook', name: 'Facebook', logo: '../../assets/images/client-logos/download.png' },
        { id: 'amazon', name: 'Amazon', logo: '../../assets/images/client-logos/download.png' },
        // Add more companies as needed
      ];
    return (
        <SlideUp>
        <div className="about-content-part-bottom ">
            <h2>Company I Worked With</h2>
            <div className="company-list">
                <div className="scroller">
                    <div className="scroller__inner">
                        <Marquee>
                        {
                            companies.map(company=> (
                                <Link to={`/company-details/${company.id}`}> <img src={company.logo} className='jarvis' alt="" /> </Link>
                            ))
                        }
                           {/* <Link to={'/single-project'}> <img src={jarvis} className='jarvis' alt="" /> </Link>
                            <img src={jarvis} alt="" />
                            <img src={jarvis} alt="" />
                            <img src={jarvis} alt="" />
                            <img src={jarvis} alt="" /> */}
                            {/* <img src={partner1} alt="" /> */}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    </SlideUp>
    )
}

export default Partners