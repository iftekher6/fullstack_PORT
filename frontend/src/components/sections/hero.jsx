import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import { RiFacebookCircleFill, RiTwitterXLine, RiLinkedinFill, RiGithubLine, RiCircleFill, RiDownloadLine } from '@remixicon/react'
import profile from "../../assets/images/about/Rifad.png"
import partner1 from "../../assets/images/client-logos/partner1.png"
import partner2 from "../../assets/images/client-logos/partner2.png"
import partner3 from "../../assets/images/client-logos/partner3.png"
import partner4 from "../../assets/images/client-logos/partner4.png"
import partner5 from "../../assets/images/client-logos/partner5.png"
import jarvis from "../../assets/images/client-logos/download.png"
import SlideUp from '../../utlits/animations/slideUp';

const Hero = () => {
    const companies = [
        { id: 'google', name: 'Google', logo: jarvis },
        { id: 'facebook', name: 'Facebook', logo: '../../assets/images/client-logos/download.png' },
        { id: 'amazon', name: 'Amazon', logo: '../../assets/images/client-logos/download.png' },
        // Add more companies as needed
      ];
    
    return (
        <section id="about" className="about-area">
            <div className="container">
                <div className="row">
                    {/* <!-- START ABOUT IMAGE DESIGN AREA --> */}
                    <div className="col-lg-4">
                        <SlideUp>
                            <div className="about-image-part">
                                <img src={profile} className='hero-img' alt="About Me" />
                                <h2>Rifad Islam</h2>
                                <p>I am a Web Designer based in san francisco.</p>
                                <div className="about-social text-center">
                                    <ul>
                                        <li><Link to=""><RiFacebookCircleFill size={20} /></Link></li>
                                        <li><Link to=""><RiTwitterXLine size={20} /></Link></li>
                                        <li><Link to=""><RiLinkedinFill size={20} /></Link></li>
                                        <li><Link to=""><RiGithubLine size={20} /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </SlideUp>
                    </div>
                    {/* <!-- / END ABOUT IMAGE DESIGN AREA -->
                    <!-- START ABOUT TEXT DESIGN AREA --> */}
                    <div className="col-lg-8">
                        <SlideUp>
                            <div className="about-content-part">
                                <p>Hello There!</p>
                                <h2>
                                    I’m Rifad Islam, a product designer crafting user-centric design with pixel-perfect precision.
                                </h2>
                                <div className="adress-field">
                                    <ul>
                                        <li className='d-flex align-items-center'><i><RiCircleFill size={14} /></i> Available for Freelancing</li>
                                    </ul>
                                </div>
                                <div className="hero-btns">
                                    <Link to="/contact" className="theme-btn">Download CV <i><RiDownloadLine size={16} /></i> </Link>
                                </div>
                            </div>
                        </SlideUp>
                        <SlideUp>
                            <div className="about-content-part-bottom">
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
                    </div>
                    {/* <!-- / END ABOUT TEXT DESIGN AREA --> */}
                </div>
            </div>
        </section>
    )
}

export default Hero