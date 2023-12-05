import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const gobacktologin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="signupcontainer">
        <div className="container my-5 text-center signupchildconatiner">
          <div className="heading">
            <h2>Signup</h2>
            <p>Enter all your details here to register yourself.</p>
          </div>

          <div className="signupform">
            <div className="text-start">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                className="forminp"
              />

              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                className="forminp"
              />

              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter password"
                className="forminp"
              />

              <button className="btn btn-success">Signup</button>

              <p className="my-2">
                <a className="link" onClick={gobacktologin}>
                  Click here
                </a>{" "}
                if you already have an acconut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
