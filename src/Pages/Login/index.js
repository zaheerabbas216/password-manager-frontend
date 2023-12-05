import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const loginFunction = async () => {
    navigate("/home");
  };

  const gotoSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="home_parent">
        <div className="home_child">
          <div className="heading">
            <h1>Password Manager</h1>
            <p>Enter your credentials to login into password manager</p>
          </div>

          <div className="adminform">
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

            <div>
              <button className="btn btn-primary" onClick={loginFunction}>
                Login
              </button>
            </div>

            <div className="my-3">
              <a className="signuplink" onClick={gotoSignup}>
                Signup here.
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
