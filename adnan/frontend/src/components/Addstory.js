

import React, { useContext, useState } from "react";
import { context } from "../states/context Api/story/context";

export const Addstory = () => {
  const states = useContext(context);
  const { addStory } = states;

  const [story, setStory] = useState({ text: "", picture: null, video: null, isPublic: false });

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('i am sending  picture',story.picture)
    await addStory(story.text, story.picture, story.video, story.isPublic);
    setStory({ text: "", picture: null, video: null, isPublic: false });
  };

  const onChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setStory({ ...story, isPublic: e.target.checked });
  };

  const handleFileChange = (e) => {
    setStory({ ...story, [e.target.name]:e.target.files[0] });
    console.log('i am story onchange picture',story.picture)
  };
  

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-center">Create a Digital Story</h1>
        <form
          className="my-3 border border-3 border-dark p-40 form-color"
          encType="multipart/form-data"
          onSubmit={handleClick}
          style={{ width: "750px",height:"450px"}}
        >
          <div className="my-3 mx-2">
            <label htmlFor="text" className="form-label" style={{ fontSize: "1.5rem" }}>Story Text</label>
            <input type="text" className="form-control border border-1 border-dark" id="text" name="text" aria-describedby="emailHelp" value={story.text} onChange={onChange} minLength={5} required/>
          </div>

          <div className="my-3 mx-2">
            <label htmlFor="picture" className="form-label" style={{ fontSize: "1.5rem" }}>Story Picture (Optional)</label>
            <input type="file" className="form-control border border-1 border-dark" id="picture" name="picture" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange}/>
          </div>

          <div className="my-3 mx-2">
            <label htmlFor="video" className="form-label" style={{ fontSize: "1.5rem" }}>Video Story (Optional)</label>
            <input type="file" className="form-control border border-1 border-dark" id="video" name="video" accept="video/mp4" onChange={handleFileChange} />
          </div>

          <div className=" my-3 form-check mx-2 d-flex align-items-center">
            <input type="checkbox" className="form-check-input border border-1 border-dark" id="public" onChange={handleCheckboxChange} />
            <label className="form-check-label mx-2" htmlFor="public" style={{ fontSize: "1.2rem" }}>Check to Make Story Public</label>
          </div>

          <button type="submit" className="btn btn-primary my-2 mx-2" style={{ fontSize: "1.2rem" }}>
            Create Story
          </button>
        </form>
      </div>
    </div>
  );
};
