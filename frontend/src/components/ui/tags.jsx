import React, { useState } from 'react';
// import './tag.css'; // For styling, add CSS file as required


const TagInput = ({label,tags, setTags, formdata, name}) => {
  
 const addTag = (event) => {
   
    if (event.key === 'Enter'  && event.target.value !== '') {
      event.preventDefault() 

      console.log(event)
      if (tags.length < 5) { // Limit to 5 tags

        // let query = event.target.value // why using query instead of hardcoded e.target.value, this function doesn't work. why?  
        // const filteredArr = suggestionArray.map(word=> word.startsWith(query))
        // const formeddata = formdata
      
      //  console.log(event.target.value , event.target.name , event.target.options)
        setTags({
          ...formdata,
          [event.target.name] : [...formdata[event.target.name], event.target.value] //task: here, when i use explicitly 'tools' instead of [e.target.name], it doesn't work why?
        })
        event.target.value = ''
        // query = '';
      } else {
        alert('Maximum 5 tags allowed.');
      }
    }
  };
  


  const removeTag = (indexToRemove) => {
  
    setTags({...formdata, [label] : tags.filter((_,i)=> i !== indexToRemove)})
  };

 
  return (
    <> 
    <div className='tags-div'>
    <label htmlFor={label} className='keyword-label'>{label}</label>
        <div className="tag-input">
      <ul className="tags">
      
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={()=> removeTag(index)} >
              &times;
            </span>
            {/* <button onClick={exampleHandler}>press</button> */}
          </li>
          
        ))}
      </ul>
      
    
      <input
        id={label}
        type="text"
        onKeyDown={addTag}
        name= {label}
        // value={input}
        // onChange={setInput}
        placeholder="Press Enter to add keywords"
        maxLength={30} // Example limit for tag length
        className='input-tag'
        // 
      />
   

    </div>
    </div>

    </>

  );
};

export default TagInput;
