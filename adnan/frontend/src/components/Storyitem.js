import React, { useContext } from "react";
import {context} from "../states/context Api/story/context";

export const Storyitem = (props) => {
  const states = useContext(context);
  const { deleteStory } = states;
  const { story,updateStory,index} = props;
  return (
    <>
      <div className="container d-flex justify-content-center my-4" key={story._id}>
        <div className="card border border-3 border-dark p-3" style={{ width: "750px" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h3> Story {index+1}</h3>
              <div className="d-flex">
                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateStory(story)}}>  Edit</i>
                <i className="fa-solid fa-trash mx-2" onClick={() => {deleteStory(story._id)}}>  Delete</i>
              </div>
            </div>
            <p className="card-title ">{story.text}</p>
            {story.picture &&  story.picture.data && (
              <img src={`http://localhost:4000/uploads/${story.picture.data}`} alt="My Story" style={{ width: '680px', height: '300px', borderRadius: '5px',border: '2px solid black' }} />
            )}
            {story.video && story.video.data && (
              <div>
                <video controls style={{ width: '680px', height: '300px', marginTop: '10px' ,border: '2px solid black'}}>
                  <source src={`http://localhost:4000/uploads/${story.video.data}`} type={story.video.contentType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
