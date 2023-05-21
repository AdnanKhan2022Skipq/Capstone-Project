import { useState } from "react";
import { context } from "./context";

const host = "http://localhost:4000";

const StoryContext = (props) => {
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);

  // get story by id
  const getStory = async (id) => {
    // api call
    const response = await fetch(`${host}/api/stories/getStory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setStory(json);
  };

  /// get all  stories
  const getStories = async () => {
    // api call
    const response = await fetch(`${host}/api/stories/getallstories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setStories(json);
  };

  // adding a new Story
  const addStory = async (text, picture, video, isPublic) => {
    const formData = new FormData();
    formData.append("text", text);
    if (picture) {
      formData.append("picture", picture);
    }
    if (video) {
      formData.append("video", video);
    }
    formData.append("isPublic", isPublic);
    // api call
    const response = await fetch(`${host}/api/stories/addstory`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: formData,
    });
    const json = await response.json();
    setStories(stories.concat(json));
  };
 

 

  // Editing a new Story
  const editStory = async (id, text, picture, video) => {
    //  api call\
    const formData = new FormData();
    formData.append("text", text);
    if (picture) {
      formData.append("picture", picture);
    }
    if (video) {
      formData.append("video", video);
    }
    const response = await fetch(`${host}/api/stories/updatestory/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: formData, // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //logic to edit
    console.log(json);

    let newStory = JSON.parse(JSON.stringify(stories));
    for (let index = 0; index < newStory.length; index++) {
      const element = newStory[index];
      if (element._id === id) {
        newStory[index].text = text;
        newStory[index].picture = picture;
        newStory[index].video = video;
        break;
      }
    }
    setStories(newStory);
  };

  
   // Deleting a new Story
   const deleteStory = async (id) => {
    // api call
    const response = await fetch(`${host}/api/stories/deletestory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //logic to edit
    console.log(json);
    const newStory = stories.filter((story) => {
      return story._id !== id;
    });
    setStories(newStory);
  };
  // Like Story
  const likeStory = async (id) => {
    //  api call\
    const response = await fetch(`${host}/api/stories/like/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //logic to edit
    console.log(json);
  };

  const commentStory = async (value, id) => {
    try {
      const response = await fetch(`${host}/api/stories/comment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ value }),
      });
      const json = await response.json();
      setStory(json); // Update the story state with the updated comments
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <context.Provider
      value={{
        stories,
        addStory,
        deleteStory,
        editStory,
        getStories,
        likeStory,
        commentStory,
        getStory,
        story,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default StoryContext;
