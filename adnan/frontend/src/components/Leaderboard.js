import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../states/context Api/story/context";

export default function Leaderboard() {
  const states = useContext(userContext);
  const { users, usersStory, getAllUser, getUserStories } = states;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getAllUser();
      getUserStories();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const getStoriesCount = (userId) => {
    const userStories = usersStory.filter(
      (story) => story.user.toString() === userId.toString()
    );
    return userStories.length;
  };
  const getStoriesLikesCount = (userId) => {
    const userStories = usersStory.filter(
      (story) => story.user.toString() === userId.toString()
    );
    let likesCount = 0;
    userStories.forEach((story) => {
      likesCount += story.likes.length;
    });
    return likesCount;
  };
  const getStoriesCommentCount = (userId) => {
    const userStories = usersStory.filter(
      (story) => story.user.toString() === userId.toString()
    );
    let commentsCount = 0;
    userStories.forEach((story) => {
      commentsCount += story.comments.length;
    });
    return commentsCount;
  };
  return (
    <>
      <div className="container my-5">
        <div className="d-flex justify-content-center mb-2">
            <h1>Leaderboard Rankings(Ranking by Likes)</h1>
        </div>

        {users.length === 0  && ( <p>Nothing to display</p> )}
        
        <div className="row ">
          {users
            .sort((a, b) => {
              const likesCountA = getStoriesLikesCount(a._id);
              const likesCountB = getStoriesLikesCount(b._id);
              const commentsCountA = getStoriesCommentCount(a._id);
              const commentsCountB = getStoriesCommentCount(b._id);

              // Sort based on comments count if comments are greater than likes for both users
              if ( commentsCountB > likesCountA || commentsCountA > likesCountB) {
                return commentsCountB - commentsCountA;
              }

              // Sort based on likes count if likes are greater or if comments are not greater than likes
              return likesCountB - likesCountA;
            })
            .map((user, index) => (
              <div key={index} className="col-md-12 d-flex justify-content-center">
                <div className="card border border-3 border-dark p- mb-3 " style={{ width: "750px" }}>
                  <div className="card-body">
                    <h6 className="card-title">Name : {user.name}</h6>
                    <h6 className="card-title">Email : {user.email}</h6>
                    {usersStory.length > 0 && (
                      <div>
                        <h6>Stories Posted: {getStoriesCount(user._id)}</h6>
                        <h6>Stories Liked: {getStoriesLikesCount(user._id)}</h6>
                        <h6>
                          Stories Comments: {getStoriesCommentCount(user._id)}
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
