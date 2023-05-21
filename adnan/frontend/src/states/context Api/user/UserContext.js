import { useState } from "react";
import { userContext } from "../story/context";

const host = "http://localhost:4000";

const UserContext = (props) => {
  const [users, setUsers] = useState([]);
  const [usersStory, setUsersStory] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // get user detail

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/getdetail", {
        method: "post",
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

  /// get all  users
  const getAllUser = async () => {
    // api call
    const response = await fetch(`${host}/api/auth/getAllUser`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setUsers(json);
  };


  // get stories for a specific user
  const getUserStories = async () => {
    const response = await fetch(`${host}/api/stories/userstories`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setUsersStory(json);
  };

  return (
    <userContext.Provider value={{ users, usersStory , getAllUser, getUserStories ,fetchUserData,userInfo}}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContext;
