import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context, userContext } from "../states/context Api/story/context";

export const Engagement = () => {
  const states = useContext(userContext);
  const storystates = useContext(context);
  const { usersStory, getUserStories } = states;
  const { stories, getStories } = storystates;
  

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/getdetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = await response.json();
      setUserInfo(json); // Store the user data in the state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchUserData();
      getUserStories();
      getStories();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const filteredStories = usersStory.filter(
    (story) => story.isPublic && story.likes.includes(userInfo?._id)
  );
  const filterMystories=stories.filter((story) => {
    if (story.likes.length === 1 && story.likes.includes(userInfo?.id)) {
      return false; // Exclude the story if the only like is from the current user
    } else {
      return true; // Include the story if there are other likes or the current user hasn't liked it
    }
  })
  return (
    <>
      <div className="container d-flex my-5">
        <div className="container my-3 border border-3 border-dark p-3 mx-3">
          <h3 className="text-center">
            Total number of Stories , You reacted{" "}
          </h3>
          {filteredStories.length === 0 ? (
            <h5>No Story Found</h5>
          ) : (
            filteredStories.map((story, index) => {
              return (
                <div
                  key={index}
                  className="card my-3 border border-3 border-dark p-3"
                >
                  <h4 className="card-title">Story {index + 1}</h4>
                  <div className="card-body my-3 border border-1 border-dark p-3">
                    <p className="card-text">Text: {story.text}</p>
                    {story.picture &&  story.picture.data  && (
                      <div>
                        <img src={`http://localhost:4000/uploads/${story.picture.data}`} alt="public stories" style={{width: '500px', height: '200px', borderRadius: '5px',border: '2px solid black' }} />
                      </div>
                    )}
                    {story.video && story.video.data && (
                      <div>
                        <video controls style={{width: '500px', height: '200px', marginTop: '10px', border: '2px solid black' }}>
                          <source src={`http://localhost:4000/uploads/${story.video.data}`} type={story.video.contentType} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="container my-3 border border-3 border-dark p-3 mx-3">
          <h3 className="text-center">
            Your Stories reacted by other users
          </h3>
          {filterMystories.length === 0 ? (
            <h5>No Story Found</h5>
          )  : (
            filterMystories
              .filter((story) => story.isPublic)
              .map((story, index) => {
                return (
                  <div
                    key={index}
                    className="card my-3 border border-3 border-dark p-3"
                  >
                    <h4 className="card-title">Story {index + 1}</h4>
                    <div className="card-body my-3 border border-1 border-dark p-3">
                      <p className="card-text">Text: {story.text}</p>
                      {story.picture &&  story.picture.data  && (
                      <div>
                        <img src={`http://localhost:4000/uploads/${story.picture.data}`} alt="public stories" style={{width: '500px', height: '200px', borderRadius: '5px',border: '2px solid black' }} />
                      </div>
                    )}
                    {story.video && story.video.data && (
                      <div>
                        <video controls style={{width: '500px', height: '200px', marginTop: '10px', border: '2px solid black' }}>
                          <source src={`http://localhost:4000/uploads/${story.video.data}`} type={story.video.contentType} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};
