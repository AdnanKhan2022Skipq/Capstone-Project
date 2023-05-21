import React, { useContext, useEffect } from "react";
import { context } from "../states/context Api/story/context";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const StoryDetail = () => {
  const states = useContext(context);
  const { story,getStory } = states;

  
  const { id }=useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStory(id);
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    };

    fetchData();
  }, [id, getStory]);

  const {text,picture,video,_id }=story;
  
  if (!story) {
    return <div>Loading...</div>; // Display a loading indicator while fetching the story
  }

  return (
    <>
      <div className="container my-3">
        <div className="card">
          <h4 className="card-title text-center">Story Detail </h4>
          <div className="card-body border border-1 border-dark p-3 d-flex">
            <div style={{width: '680px', height: 'auto' }}>
              <p className="card-text">Text: {text}</p>
            </div>
            <div>
              {picture &&  picture.data  && (
                <div>
                  <img src={`http://localhost:4000/uploads/${picture.data}`} alt="public stories" style={{width: '550px', height: '200px', borderRadius: '5px',border: '2px solid black' }} />
                </div>
              )}
              {video && video.data && (
                <div>
                  <video controls style={{width: '550px', height: '200px', marginTop: '10px', border: '2px solid black' }}>
                    <source src={`http://localhost:4000/uploads/${video.data}`} type={video.contentType} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

            </div>
          </div>
          <Comment storyID={_id} />
        </div>
      </div>
    </>
  );
};

export default StoryDetail;
