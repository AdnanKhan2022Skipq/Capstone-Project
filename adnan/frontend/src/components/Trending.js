import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context, userContext } from "../states/context Api/story/context";
import Likes from "./Likes";


export default function Trending() {
  const states = useContext(userContext);
  const { usersStory, getUserStories } = states;
  const storyStates = useContext(context);
  const {likeStory } = storyStates;
  const navigate = useNavigate();
  

  useEffect(() => {
    getUserStories();
    // eslint-disable-next-line
  }, []);


  const handleViewDetails = (story, index) => {
    navigate(`/stories/${index}`, { state: story });
  };

 
  const handleLike = async (storyID) => {
    if (localStorage.getItem("auth-token")) {
      await likeStory(storyID); // Call the likeStory function to update the like status
      getUserStories(); // Refetch the user stories after updating the like status
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-3">Most Trending Stories</h1>
      {usersStory.length === 0 || (usersStory.filter((story) => story.isPublic).length === 0 && ( <p>Nothing to display</p> ))}
      <div className="row">
      {usersStory
        .filter((story) => story.isPublic)
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((story, index) => {
            return (
              <div key={index} className="col-md-12 d-flex justify-content-center">
                <div className="card border border-3 border-dark p-3 mb-3 " style={{ width: "750px" }}>
                  <div className="card-body">
                    <h4 className="card-title my-3">Story {index + 1}</h4>
                    <p className="card-text">Text: {story.text}</p>
                    {story.picture &&  story.picture.data  && (
                      <div>
                        <img src={`http://localhost:4000/uploads/${story.picture.data}`} alt="public stories" style={{width: '680px', height: '300px', borderRadius: '5px',border: '2px solid black' }} />
                      </div>
                    )}
                    {story.video && story.video.data && (
                      <div>
                        <video controls style={{width: '680px', height: '300px', marginTop: '10px', border: '2px solid black' }}>
                          <source src={`http://localhost:4000/uploads/${story.video.data}`} type={story.video.contentType} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="mx-2 align-self-center">
                      <button className="btn" onClick={() => handleLike(story._id)}>
                        <Likes story={story} handleLike={handleLike} />
                      </button>
                    </div>
                    <div className="align-self-center">
                      <button className="btn btn-success" onClick={() => handleViewDetails(story, index + 1)}>View Detail ...</button>
                    </div>
                  </div>
                </div>  
              </div>
            );
          })}
      </div>
    </div>
  );
}
