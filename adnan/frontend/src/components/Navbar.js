import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../states/context Api/story/context";

export default function Navbar({showAlert}) {
  const states = useContext(userContext);
  const { userInfo, fetchUserData } = states;

  let navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("auth-token")
    
    showAlert("success","User has been Logged Out Successfully !")
    navigate('/login')
  }
  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem("auth-token")){
      fetchUserData();
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("auth-token")]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          Digital Stories
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/MyNotes" ?"active":""}`} aria-current="page" to="/MyNotes">
                MyStories
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/Trending" ?"active":""}`}  to="/Trending">
                Trending
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/Engagement" ?"active":""}`}  to="/Engagement">
                Engagement
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/Leaderboard" ?"active":""}`} to="/Leaderboard">
                Leaderboard
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("auth-token")?<form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form>:(
              <div className="d-flex align-items-center">
                {userInfo ? (
                  <div>
                    <span className="text-light me-2">
                      Welcome, {userInfo.name}
                    </span>
                    {/* Render additional user information */}
                    <span className="text-light me-2">
                      Email: {userInfo.email}
                    </span>
                    {/* Add more properties as needed */}
                  </div>
                ) : (
                  <span className="text-light">Loading...</span>
                )}
                <button onClick={handleLogout} className="btn btn-primary">
                  Log Out
                </button>
                </div>)}
          </div>
        </div>
      </nav>
    </>
  );
}
