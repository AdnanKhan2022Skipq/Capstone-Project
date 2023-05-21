import React, { useContext, useEffect, useState } from "react";
import { context, userContext } from "../states/context Api/story/context";
import { useNavigate } from "react-router-dom";
import Likes from "./Likes";

export const PublicStories = () => {
  const states = useContext(userContext);
  const { usersStory, getUserStories } = states;

  const storyStates = useContext(context);
  const { likeStory } = storyStates;

  const navigate = useNavigate();

  const [sortByDate, setSortByDate] = useState("Sort by Likes");

  useEffect(() => {
    getUserStories();
    // eslint-disable-next-line
  }, []);

  const handleViewDetails = (storyID) => {
    navigate(`/stories/${storyID}`);
  };

  const handleLike = async (storyID) => {
    if (localStorage.getItem("auth-token")) {
      await likeStory(storyID);
      getUserStories();
    } else {
      navigate("/login");
    }
  };

  const handleSortByDate = () => {
    if(sortByDate==="Latest Stories"){
      setSortByDate("Sort by Likes")
    }
    else{
      setSortByDate("Latest Stories")
    }
  };

  const sortedStories = usersStory
    .filter((story) => story.isPublic)
    .sort((a, b) => {
      if (sortByDate==="Latest Stories") {
        return new Date(b.date) - new Date(a.date);
      } else {
        const aLikes = a.likes.length;
        const bLikes = b.likes.length;
        const aComments = a.comments.length;
        const bComments = b.comments.length;

        if (aLikes === bLikes) {
          return bComments - aComments;
        }
        return bLikes - aLikes;
      }
    });

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between ">
        <div className="align-self-center mx-auto">
          <h1 className="text-center ml-50">Public Stories</h1>
        </div>
        <div className="align-self-center mx-auto">
          <button className="mx-2" onClick={handleSortByDate}>
            {sortByDate==="Sort by Likes" ? "Latest Stories" : "Sort by Likes"}
          </button>
        </div>
      </div>
      {sortedStories.length === 0  && ( <p>Nothing to display</p> )}
      <div className="row">
      {sortedStories.map((story, index) => {
          return (
            <div key={index} className="col-md-12 d-flex justify-content-center">
              <div className="card border border-3 border-dark p-3 mb-3 " style={{ width: "750px" }}>
                <div className="card-body">
                  <h4 className="card-title">Story {index + 1}</h4>
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
                <div className="d-flex justify-content-between border border-2 border-dark">
                  <div className="mx-2 align-self-center">
                    <button className="btn" onClick={() => handleLike(story._id)}>
                      <Likes story={story} handleLike={handleLike} />
                    </button>
                  </div>
                  <div className="align-self-center">
                    <button className="btn btn-success" onClick={() => handleViewDetails(story._id)}>View Detail ...</button>
                  </div>
                </div>
              </div>
            </div>
            
          );
        })
      }
      </div>
    </div>
  );
};

