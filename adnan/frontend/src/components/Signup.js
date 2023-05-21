import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = ({showAlert}) => {
  const navigate=useNavigate()
  const [credential, setCredential] = useState({name:"", email: "", password: "",confirmPassword:""})
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(credential)
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:credential.name , email: credential.email, password: credential.password,confirmPassword:credential.confirmPassword})
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      if (json.success) {
        //redirect
        localStorage.setItem('auth-token',json.authtoken)
        showAlert("success","Congratulation on creating new Account , Now you can Login Successfully ! ")
        navigate('/login')
      }
      else{
        alert("invalid credentials")
      }
  }
  const onChange = (e) => {
    setCredential({...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5  p-5 d-flex justify-content-center align-items-center">
        <form  className="border border-3 border-dark" onSubmit={handleSubmit} style={{ width: "750px",height:"550px"}}>
        <div className="my-4 mx-2">
          <label htmlFor="name" className="form-label" style={{ fontSize: "1.5rem" }}>Name : </label>
          <input type="text" className="form-control" id="name" name="name" minLength={3} onChange={onChange} required />
        </div>

        <div className="my-4 mx-2">
          <label htmlFor="email" className="form-label" style={{ fontSize: "1.5rem" }}>Email address : </label> 
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} required />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="my-4 mx-2">
          <label htmlFor="password" className="form-label" style={{ fontSize: "1.5rem" }}>Password : </label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        
        <div className="my-4 mx-2">
          <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: "1.5rem" }}>Confirm Password : </label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary mb-4 mx-2">Sign Up</button>
      </form>
    </div>
  )
}
