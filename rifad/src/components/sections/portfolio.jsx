import React, { useState , useEffect} from 'react'
import workScribble from "../../assets/images/custom/work-scribble.svg"
// import { projectsData } from '../../utlits/fackData/projectData'
import ImageSlider from '../ui/imageSlider';
import { Link } from 'react-router-dom';
import cat from '../../assets/images/custom/cat.png'
import { server } from '../../main';

const Portfolio = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projectsData, setProjectsData] = useState([])

    const getProjects = async() =>{
        const response = await fetch(`${server}/api/v1/work/upload`)
        const data = await response.json()
        setProjectsData(data.companies)
        console.log(data.companies)
     }
    
     useEffect(()=>{
         getProjects()
     },[])
     const thumb = projectsData
     console.log(thumb)
    const openSlider = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeSlider = () => {
        setIsOpen(false);
    };

    return (
        <>
        {
            
        }
            <div className="projects-area" id="portfolio">
              
                <div className="custom-icon">
                    <img src={workScribble} alt="custom" />
                </div>
                <div className="container-fluid">
                    <div className="row g-2 gapsz ">
                        {projectsData.map((project, index) => {
                            return (
                                <div key={project.id} className= 'col-md-4 col-xl-4  '>
                                    <div className="work-popup">
                                        <div onClick={() => openSlider(index)} className="portfolio-box">
                                            <img src={project.thumbnail} alt="" data-rjs="2" />
                                            <span className="portfolio-category">{project.contentType}</span>
                                            <h1 className="portfolio-caption"><Link to={"/single-project"} >{project.title}</Link></h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ImageSlider images={projectsData} isOpen={isOpen} onClose={closeSlider} currentIndex={currentIndex} />
        </>
    )
}

export default Portfolio

