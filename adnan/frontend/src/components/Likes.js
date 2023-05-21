import React, { useEffect, useState } from "react";

const Likes = ({ story, handleLike }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes.length);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        setIsLoading(false); // Data fetching completed
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false); // Data fetching completed with error
      }
    };
  
    fetchUserData();
  
    const userLiked = story.likes.find((like) => like === userInfo?._id);
    setHasLiked(userLiked !== undefined);
    setLikeCount(story.likes.length);
  }, [story.likes, userInfo]);
  
  if (isLoading) {
    return <>Loading...</>; // Display a loading indicator while fetching data
  }


  const toggleLike =  () => {
       handleLike(story._id); // Call the handleLike function to toggle the like status
  };

  return (
    <>
      <i
        className={`fa-solid fa-thumbs-up ${hasLiked ? "text-primary" : ""} `}
        onClick={toggleLike}
      />
      &nbsp;{likeCount} {likeCount === 1 ? "like" : "likes"}
    </>
  );
};

export default Likes;
