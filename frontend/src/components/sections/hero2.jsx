import React,{useState, useEffect , useRef} from 'react'
import showReel from '../../assets/images/custom/hero.mp4'
import searchIconSVG from '../../assets/images/custom/searchii.svg'
import Portfolio from './portfolio'
import SlideUp from '../../utlits/animations/slideUp';
import jarvis from "../../assets/images/client-logos/download.png"
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom'
import {TypeAnimation} from 'react-type-animation'
import {ReactTyped} from 'react-typed'
// import { projectsData } from '../../utlits/fackData/projectData'
import { server } from '../../main';
import ReactDOM from 'react-dom'
import moment from 'moment'
import cancelSVG from '../../assets/images/x-circle.svg'
import axios from 'axios';
import {ClipLoader} from 'react-spinners'

const HeroShowReel=()=>{
  
    

      const placeholderText = "Search my works.."; // Text to type
      const [displayedText, setDisplayedText] = useState("");
      const [index, setIndex] = useState(0);
      const [doSearch, setDoSearch] = useState('')
      const [isFocused, setIsFocused] = useState(false);
      const [projectsData, setProjectsData] = useState([])
      const [isPortalReady, setIsPortalReady] = useState(false);
      const [filterDate,setFilterDate] = useState(false)
      const [year, setYear] = useState('')
 
      
      const inputRef = useRef(null);
      const suggestionRef = useRef(null)
      // console.log(suggestionRef.current, 'ref')
      
     const handleClickOutside = (event) =>{
          if(suggestionRef.current && !suggestionRef.current.contains(event.target)){
            setIsFocused(false)
          }
     }
     
     useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedow', handleClickOutside)
      }
     
    },[])

      useEffect(() => {
      // console.log('fireddd')
      const dropdownRoot = document.getElementById('dropdown-root');
        const dropdownRoots = document.getElementById('root');
        // console.log(dropdownRoot, 'lala')
        // console.log(dropdownRoots, 'lalas')
        if (dropdownRoot) {
          setIsPortalReady(true);  // Set portal ready when dropdown-root exists in DOM
        }
      }, []);
    
      const calculatePosition = () => {
   
        if (inputRef.current) {
          const rect = inputRef.current.getBoundingClientRect();
          return {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width
          };
        }
   
        return { top: '10px', left: 0, width: '100%' };
    
   
      };
    
      const getProjects = async() =>{
          const params = {}
          if(year) params.year = year 
          console.log(params.year)
          const {data} = await axios.get(`${server}/api/v1/work/upload`,{params} )
          // const data = await response.json()
          setProjectsData(data.companies)
          // console.log(data.companies)
          // console.log(data.companies.map(work=> work.date.slice(0,4)))
          // setYear(data.companies.map(work=> work.date.slice(0,4)))
       }

      
       useEffect(()=>{
           getProjects()
       },[year])

    
      // Function to highlight the matching part of each suggestion
      const highlightText = (text, query) => {
        if (!query) return text;
        console.log(text)
        console.log(query)
        const regex = new RegExp(`(${query})`, 'gi');
        console.log(regex)
        const parts = text.split(regex);
        const partswithoutregex = text.split();
        console.log(parts)
        console.log(partswithoutregex)
        return parts.map((part, index) =>
          
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'bold', color: 'rgb(196, 240, 0)' }}>
              {part}
            </span>
          ) : (
            part
          )
        );
      };


      // console.log(filter)
      // console.log(filter.map(data=> console.log(data)))
      
      useEffect(() => {
        const speed = 200; // Typing speed
        if (index < placeholderText.length) {
          const typingTimeout = setTimeout(() => {
            setDisplayedText((prev) => prev + placeholderText[index]);
            setIndex((prev) => prev + 1);
          }, speed);
          return () => clearTimeout(typingTimeout);
        } else {
          const resetTimeout = setTimeout(() => {
            setDisplayedText(""); // Clear the placeholder
            setIndex(0); // Reset typing
          }, 2000); // Delay before resetting
          return () => clearTimeout(resetTimeout);
        }
      }, [index, placeholderText]);
    

    //   let currentIndex = 0;
    
    //   useEffect(() => {
    //     const intervalId = setInterval(() => {
    //       currentIndex = (currentIndex + 1) % placeholderTexts.length;
    //       setPlaceholder(`Search ${placeholderTexts[currentIndex]}`);
    //     }, 2000);
    
        
    //     return () => clearInterval(intervalId);  // Clean up interval on component unmount
    //   }, []);
 
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = (e) => {
      // Check if the blur event is happening because of clicking on a suggestion
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsFocused(false);
      }
    };
    const handleSearch = (event)=>{
      event.preventDefault()
      setDoSearch(event.target.value)
     
      // setGotuggestion(prev=> [...prev, suggestions.title])
     
    }

    const filteredSuggestion = projectsData.filter((suggestion, i) => {
      // setDoSearch('')
       const data = suggestion.contentType.toLowerCase().includes(doSearch.toLowerCase())
          ||suggestion.client.client.toLowerCase().includes(doSearch.toLowerCase())
       ||suggestion.title.toLowerCase().includes(doSearch.toLowerCase())
       ||suggestion.tools.join('').toLowerCase().includes(doSearch.toLowerCase())
       ||suggestion.tools.includes(doSearch.toLowerCase())
      
       // console.log('aaaaaaaaaa', data)
         
       return data
    
} )
// console.log(filteredSuggestion.length)
    const years = [2024,2023,2022,2021,2020,2019]
    return(
       <section className='hero-container'>
 
             <video  className='hero-video' autoPlay muted loop> 
                <source src={showReel}/>
            </video> 
     
          <div  className='content-hero'>
          <span className='hero-span'>&#x25BC;Editor-Producer-Colorist </span>
          <h1 className='h1-hero'>Cinematic brand stories 
            <br />
            <span>optimized to engage</span>
          </h1>
          <div className='buttons-hero'>
            <div className='menu-btnsHero'>
            <button className='theme-btnsHero'>My Resume</button>
            <div class="gradient-btnHero">
            </div>
            </div>
          {/*search bar  */}
         <div className='search-bar-container' ref={inputRef}>
          
       
             
         <div className="containers" >
 
    <img src={searchIconSVG} alt="icon" class="icon" />

    <input type="text"        
  value={doSearch}  onBlur={()=> setIsFocused(false)} onFocus={()=> setIsFocused(true)} onChange={handleSearch} placeholder={displayedText}  class="search" />
   
  
    </div>
    <div class="gradient">
      
    </div>
    {isFocused && isPortalReady && ReactDOM.createPortal(
                <div className="suggestions-container" style={calculatePosition()}  ref={suggestionRef}  onMouseDown={(e) => e.preventDefault()} onClick={(e)=> e.stopPropagation()}>
            <div className='filter' >
               
               <span>Filter By:</span>
                     <button onClick={()=> setFilterDate(prev=> !prev)}>
         
                        Date
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" className={`svg ${filterDate? 'rotatedSVG' : ''}`} viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
   </svg>
                       </button> 
     
    {
     year && 
     <span className='showingResultYear'>showing results of the year: {year}  <img src={cancelSVG} style={{backgroundColor: 'red', borderRadius: '50%'}} alt="cancel-svg" 
     onClick={()=> setYear('')}
     />
   </span>
    }
     
                       {filterDate &&
           (
             <div className='filterContainer'>
               {
                 years.map(year=> (
                   <span onClick={()=> {
                      setYear(year)
                      setFilterDate(false)
                      
                   }
                   }>· {year}</span>
                 ))
               }
             {/* <span>· 2014</span>
             <span>· 2014</span>
             <span>· 2014</span> */}
               
             </div>
           )
           }
              </div>
            {projectsData.length > 0 ? 
           <>

         { filteredSuggestion.length === 0 ? 
         
         <div className='error-match'>
          <h5>No rojects found</h5>
          <span>{doSearch} did not match any results.</span>
          <button onClick={()=> {
          //  console.log('cleared clicked')
           setDoSearch('')
          }} className='theme-btns' style={{fontSize: '12px'}}>Clear Search</button>
         </div> 
         
         : (
              filteredSuggestion.map((suggestions, index) => (
                <div key={index} className="suggestion-item">
               
                 
                 <Link to={`/single-project/${suggestions._id}`}>
                 <div className='suggestion-flex'>
                  <div className='suggestion-image'>
                    <img src={suggestions.thumbnail} alt="thumbnail"  />
                  </div>
                {/* content area */}
                 <div className='suggestion-content'>
                
                 <span title={suggestions.title} className='suggestion-title'>{highlightText(suggestions.title, doSearch)}</span>
                  <div>
                    <ul className='suggestions-ul'>
                    <li className='client-li'>JarvisOffice ·</li> 
                      {/* <li>{highlightText(suggestions.contentType, doSearch)} · </li>  */}
                      <li className='contentType-li'>{highlightText(suggestions.contentType, doSearch)} ·</li> 
                      <li>{moment(suggestions.date).format("YYYY")}</li> 
                   
                      {/* <li></li>  */}
                     
                      </ul>
                      <div title={suggestions.tools.map(tool=> tool)} className='suggestion-tools'>
                        {/* {suggestions.tools.map((tool)=>(
                          <li>{highlightText(tool, doSearch)}</li> */}
                          <li>figma</li>
                          <li>dribble</li>
                       
                       
                        
                      </div>
                    </div>    
                  </div>
                 </div>
                
            
                 </Link>
                
             
                </div>
               
              )) 
         )
                
                 
                  }
            </>
            
            : <ClipLoader color='rgb(196, 240, 0)' className='loading-spinner'/>}

            
             
              
            
                 
          </div>,
           document.getElementById('dropdown-root') // Target the specific DOM element   
       
                  
        )
      
          
        }

          </div>
      
        </div> 
       {/*  */}
          </div>
          
          
       </section>
    )
}

export default HeroShowReel