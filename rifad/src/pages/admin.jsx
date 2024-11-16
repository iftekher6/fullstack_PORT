import React, { useEffect, useState } from 'react'
import TagInput from '../components/ui/tags'
import axios from 'axios'
import { server } from '../main'
import io from 'socket.io-client'

function Admin() {
  
  const socket = io()
  const [client, setClient] = useState('')
  const [clientIcon, setClientIcon] = useState('')

  const [uploadPercentage, setUploadPercentage] = useState(0)
 
  

  const [company, setCompany] = useState(['artcell', 'warfaze'])
  const [isClientExists, setIsClientExists] = useState(true)
  const [error, setError] = useState({})

  

    
  const [clientDetails, setClientDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    // Check if the socket connection is successful
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('serverProgress', (data) => {
        console.log("Progress received:", data);
        setUploadPercentage(data)
    });

    return () => {
        socket.off('serverProgress');
        socket.off('connect');
    };
}, []);

  const handleFileChange = (e) => {
    console.log(e.target.files)
    setVideos(e.target.files); // Save the selected files to state
  };

// console.log(videos)

  const [formdata, setFormdata] = useState({
       client: '',
       icon : null,
       title : '',
       date : '',
       description: '',
       copy: '',
       brief : '',
       tools : [],
       keywords : [],
       thumbnail : [],
       video : [], 
       contentType : ''


  })
 console.log(formdata.keywords)
 console.log(formdata.video)
  console.log({formdata})

 const handleOnChange = (event)=> {
    event.preventDefault()
    setFormdata({
      ...formdata,
      [event.target.name] : event.target.value
    })
    if (error.title  && event.target.value.length > 0) {
      setError((prev) => ({ ...prev, title: null }));
    }
  }

  const handleFiles = (event)=>{
    console.log(event.target.files)
    event.preventDefault()
    const selectedFiles = Array.from(event.target.files)
    setFormdata({
      ...formdata,
      [event.target.name] : [...formdata[event.target.name], ...selectedFiles]
    })
  }
  const handleIcon = (event)=>{
    event.preventDefault()
    setFormdata({
      ...formdata,
      icon : event.target.files[0]
    })
  }

 
 
  const formData = new FormData()
  formData.append('client', formdata.client)
  formData.append('icon', formdata.icon)
  formData.append('title', formdata.title)
  formData.append('description', formdata.description)
  formData.append('copy', formdata.copy)
  formData.append('brief', formdata.brief)
  formData.append('tools', formdata.tools)
  formData.append('keywords', formdata.keywords)
  formData.append('date',formdata.date)
  // formData.append('thumbnail', formdata.thumbnail)
  formData.append('contentType', formdata.contentType)
  formdata.video.forEach(vid=>{
    formData.append('video', vid)
  }) 
  formdata.thumbnail.forEach(thumb=>{
    formData.append('thumbnail', thumb)
  })

  const handleOnClick = ()=>{
    setIsClientExists(!isClientExists)
  } 

 const getClientDetails = async()=>{
   try {
    const {data} = await axios.get(`${server}/api/v1/company/getClientDetails`)
    // console.log(response.data.clients.map(client=> client.client))
    const clientName = data.clients.map(client=> client.client)
    setClientDetails(clientName)

    
   } catch (error) {
      console.log(error)
   }
 }
 useEffect(()=>{
  getClientDetails()
 },[])
//  console.log(Array.from(formdata.client).map((value)=> console.log(val)))

  const handleSubmit =async(e)=>{
    e.preventDefault()

    let validationError = {}
    if(formdata.title === '' ){
      validationError.title = 'title is required!'
    }
    if(formdata.description === '' ){
      validationError.description = 'description is required!'
    }
    if(formdata.client === '' ){
      validationError.client = 'client is required!'
    }
    console.log(Object.keys(validationError))
    if(Object.keys(validationError).length > 0){
      setError(validationError)
      return;
    }
     try {
      setLoading(true)
      const response = await axios.post(`${server}/api/v1/work/upload`, formData ,
       {
       headers: {
        'Content-Type': 'multipart/form-data',

      },
      
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        console.log(loaded)
        // const percentage = Math.floor((loaded * 100) / total);
        // setUploadPercentage( percentage );
        const percentage = (progressEvent.loaded / progressEvent.total) * 50; // Allocate 50% for upload
        setUploadPercentage(percentage); // Update client-side progress bar
      },
      
    });
    
          // On successful upload, start listening for server-side progress
          if (response.status === 200) {
            socket.on('serverProgress', (serverProgress) => {
               // Combine client and server progress (e.g., 50% from upload + serverProgress)
              setUploadPercentage(50 + serverProgress / 2);
            });
         }
   
      console.log(response.data)
      setLoading(false)
      console.log('data sent')
      setTimeout(() => setUploadPercentage(0), 1000);

     } catch (error) {
      setLoading(false)
      console.log(error)
     }
    
     setFormdata({
      ...formdata,
      title : ''
    })
    setError({})
    
    
  }

    

    


  
// uploadFile(formdata.video)

  return (
    <div className='admin-area'>
        <div className='container'>

            <div className='container-inner'>
            <h2 className='h2-admin'>Admin Panel</h2>
           <form onSubmit={handleSubmit}>
            
    <div className='input-group'>

{isClientExists ? 
<div className='input-box'>
<label for="client" onClick={()=> handleOnClick()}>client name or create new?</label>
<select id="client" className='admin-input' name='client' value={formdata.client} onChange={handleOnChange}> 
<option selected className='option-choose'>Choose a Company</option>
{

clientDetails.map(name=> (
<option className='option-choose' value={name}>
{name}
</option>
))
}
</select>
{error.client && <p style={{color: 'red'}}>{error.client}</p>}
</div>
:  <div className='input-box'>
<label htmlFor="client" onClick={()=> handleOnClick()}>Client</label>
<input type="text" id="client" name="client"  value={formdata.client} onChange={handleOnChange} className="admin-input" placeholder="aegon" required data-error="Please enter your Name" />
{error.client && <p style={{color: 'red'}}>{error.client}</p>}
</div>
}


<div className='input-box'>
<label htmlFor="date">Date</label>
<input type="date"  id="date" name="date" value={formdata.date}  onChange={handleOnChange} className="admin-input"  />
</div>
    </div>

<div className='input-box'>
<label htmlFor="title">Title</label>
<textarea  id="title" name='title' className={`${error.title ? "admin-input-textareaError" : "admin-input-textarea"}`} value={formdata.title} onChange={handleOnChange} rows='1'  ></textarea>
{error.title && <p style={{color: 'red'}}>{error.title}</p>}
</div>

<div className='input-box'>
<label htmlFor="description" >Description</label>
<textarea id="description" name='description' value={formdata.description} onChange={handleOnChange} className='admin-input-textarea' rows='2' ></textarea>
{error.description && <p style={{color: 'red'}}>{error.description}</p>}
</div>

<div className='input-box'>
<label htmlFor="brief" >Brief</label>
<textarea id="brief" name='brief' value={formdata.brief} onChange={handleOnChange} className='admin-input-textarea' rows='2' cols='10'></textarea>
</div>

<div className='input-box'>
<label  htmlFor="copy" >Copy</label>
<textarea id="copy" name='copy' value={formdata.copy} onChange={handleOnChange} className='admin-input-textarea' rows='2' cols='10'></textarea>
</div>


<TagInput label='tools' name='tools' tags={formdata.tools} formdata={formdata} setTags={setFormdata} />
<TagInput label='keywords'  name ='keywords' tags={formdata.keywords} formdata={formdata} setTags={setFormdata} />
{/* <TagInput label='keywords' tags={formdata.keywords} setTags={setFormdata}/> */}



<div className='input-box'>
<label  htmlFor="contentType">Content Type</label>
<input type="text" id="contentType" name="contentType" value={formdata.contentType}
 onChange={handleOnChange} className="admin-input-contentype" required placeholder="Content Type.."  />
</div>


{/* file upload section */}

<div className='input-box-file'>
<label htmlFor="thumbnail" className='file-labels'>Thumbnail Upload</label>
<input type="file" id="thumbnail" required name="thumbnail" multiple onChange={handleFiles} className="file
"/>
</div>
<div className='input-box-file'>
<label htmlFor="video" className='file-labels'>Video Upload</label>
<input type="file" id="video" name="video"  multiple onChange={handleFiles} className="file"/>
</div>

{
!isClientExists &&
<div className='input-box-file' >
<label htmlFor="icon" className='file-labels' >Client Icon</label>
<input type="file" id="icon" name="icon" onChange={handleIcon}  className="file"/>
</div>
}






<div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${uploadPercentage}%` }}
              ></div>
          </div>

          <p>{uploadPercentage}%</p> 
        {uploadPercentage === 100 && alert('Uploaded') & setTimeout(() => {
           setUploadPercentage(0)
        }, 1000)} 

<div className='btn'>
  
<button className='theme-btn'>{loading ? 'loading...' : 'Submit'}</button>
</div>



           </form>
          

   
            </div>
        
 
        
        </div>
     

    </div>
  )
}

export default Admin

