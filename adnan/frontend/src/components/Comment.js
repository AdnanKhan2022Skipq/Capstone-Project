import React, { useContext, useEffect, useState } from "react";
import { context } from "../states/context Api/story/context";

const Comment = ({ storyID }) => {
  const states = useContext(context);
  const { getStory, story, commentStory } = states;

  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async (storyID) => {
      try {
        await getStory(storyID);
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    };
  
    fetchData(storyID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const handleCommentSubmit = async (value, storyID) => {
    setIsLoading(true);
    try {
      await commentStory(value, storyID);
      setIsLoading(false);
      setNewComment(""); // Clear the comment input after successful submission
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setIsLoading(false);
    }
  };

 
  if (isLoading) {
    return <>Loading...</>; // Display a loading indicator while fetching data
  }



  return (
    <>
      <div className="my-3 border border-1 border-dark p-3">
        <h6>Comments</h6>
        <div>
        {story && story.comments && story.comments.length === 0 ? (
        <p>No comments yet.</p>
        ) : (
          <ul>
            {story && story.comments && story.comments.map((c, i) => (
              <li key={i}>{c}</li>
             ))}
          </ul>  
        )}
        </div>
      </div>
      <div className="container my-5">
        <h3>Leave a Comment</h3>
        <form id="commentform"
         onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(newComment, storyID);
        } }>
          <div className="mb-3 mt-2">
            <textarea className="form-control" name="comment" id="comment" rows="10" tabIndex="4" placeholder="Write a comment..." value={newComment} onChange={(e) => {   setNewComment(e.target.value); }} required ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 my-2" disabled={!newComment}>
            Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
