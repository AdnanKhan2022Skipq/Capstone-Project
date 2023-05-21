import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import StoryContext from "./states/context Api/story/StoryContext";
import Trending from "./components/Trending";
import MyStories from "./components/MyStories";
import { Alert } from "./components/Alert";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { PublicStories } from "./components/PublicStories";
import { Engagement } from "./components/Engagement";
import StoryDetail from "./components/StoryDetail";
import UserContext from "./states/context Api/user/UserContext";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert=(type,message)=>{
      setAlert({
        type: type ,
        message:message
      })
      setTimeout(() => {
        setAlert(null)
      }, 2500);
  }
  return (
    <>
      <StoryContext>
        <UserContext>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/stories/:id" element={<StoryDetail />}></Route>
            <Route exact path="/MyNotes" element={<MyStories />}></Route>
            <Route exact path="/" element={<PublicStories />}></Route>
            <Route exact path="/stories/:id" element={<StoryDetail />}></Route>
            <Route exact path="/Trending" element={<Trending />}></Route>
            <Route exact path="/Engagement" element={<Engagement />}></Route>
            <Route exact path="/Leaderboard" element={<Leaderboard />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
          </Routes>
        </Router>
        </UserContext>
      </StoryContext>
    </>
  );
}

export default App;
