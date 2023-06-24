import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate } from "react-router-dom";
import "./sign.css"

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState();
  const navigate = useNavigate()


  const HandleButton = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    if (name === "") {
      toast.error("please enter your name");
    }
    else if (email === "") {
      toast.error("please enter your email")
    } else if (!email.includes("@")) {
      toast.error("please enter special character like, @")
    } else if (password === "") {
      toast.error("please enter your password");

    } else if (password.length < 8) {
      toast.error('minimum character required eight')

    }
    else if (!password.includes('@')) {
      toast.error('please enter spacial character in your password')
    }
    else {
      const result = await fetch('https://backchat-frf1.vercel.app/register', {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-type": "application/json"
        }
      })
      const data = await result.json();
      console.log(data)
      if (data) {
        alert("user register successfully")
        navigate("/");
      } else {
        toast.error("user not register");
      }
    }

  }
  return (
    <>
      <div className="wraper-class"></div>
      <div className="signup">
        <div className="sign-up-page">
          <div className="input-type-box">

            <img src="./Images/logo.avif" alt="logo" />
          </div>
          <div className="right-side-form">
            <div className="img-logo">
              <img src="./Images/man.png" alt='logo' />
            </div>
            <h3 className="text-light">welcome to Register page</h3>

            <forn>
              <input type="text" placeholder="enter your name" name="text" value={name} onChange={(e) => setName(e.target.value)} />
              <br />
              <input type="email" placeholder="enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <input type={!toggle ? 'password' : "text"} placeholder="enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <br />
              <span className="hide-show" onClick={() => setToggle(!toggle)}>
            {
              toggle ? <i class="fas fa-eye" ></i> : <i class="fas fa-eye-slash" ></i>
            }
          </span>
              <div className="input-btn">
                <button className="btnBtn" onClick={(e) => HandleButton(e)}>Sign Up</button>
                {/* <span> Already have an account <NavLink to="/login">Login</NavLink></span> */}
              </div>
              {/* <div>
              <span> Already have an account <NavLink to="/login">Login</NavLink></span>
             </div> */}
            </forn>


          </div>

        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
