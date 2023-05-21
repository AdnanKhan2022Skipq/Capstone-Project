import React, { useContext, useEffect, useRef, useState } from "react";
import {context} from "../states/context Api/story/context";
import { Storyitem } from "./Storyitem";
import { Addstory } from "./Addstory";
import { useNavigate } from "react-router-dom";
// import { Testing } from "./Testing";
export const Story = () => {
  const states = useContext(context);
  let navigate=useNavigate()
  const { stories,getStories,editStory } = states;

  useEffect(() => {
    if(localStorage.getItem("auth-token")){
      getStories();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const [story, setStory] = useState({id:"",etext:"",epicture:null,evideo:null});

  const updateStory=(currentstory)=>{
    ref.current.click();
    setStory({id:currentstory._id,etext:currentstory.text,epicture:currentstory.picture,evideo:currentstory.video})
  }

  const handleClick = (e) => {
    console.log('i am at sending ',story.epicture)
    editStory(story.id,story.etext,story.epicture,story.evideo)
    refClose.current.click();
  };
  const onChange = (e) => {
    setStory({...story, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setStory({ ...story, [e.target.name]:e.target.files[0] });
    console.log('i am story onchange picture',story.epicture)
  };

  const ref = useRef(null)
  const refClose = useRef(null)
  

  return (
    <>
      <Addstory />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Story</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">

              <form className="my-3" encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Story Text</label>
                  <input type="text" className="form-control" id="etext" name="etext" value={story.etext} aria-describedby="emailHelp" onChange={onChange} minLength={5}  required/>
                </div>

                <div className="my-3 mx-2">
                  <label htmlFor="epicture" className="form-label" style={{ fontSize: "1.5rem" }}>Story Picture (Optional)</label>
                  <input type="file" className="form-control border border-1 border-dark" id="epicture" name="epicture" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange}/>
                </div>

                <div className="my-3 mx-2">
                  <label htmlFor="evideo" className="form-label" style={{ fontSize: "1.5rem" }}>Video Story (Optional)</label>
                  <input type="file" className="form-control border border-1 border-dark" id="evideo" name="evideo" accept="video/mp4" onChange={handleFileChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h1 className="text-center">My Stories</h1>
        {stories.length===0 && "Nothing to dispaly"}
        {stories.map((story, index) => {
          return <Storyitem key={story._id} story={story} updateStory={updateStory} index={index}  />;
        })}
      </div>
    </>
  );
};