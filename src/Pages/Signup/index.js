import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { SignupService } from "../../Services/AuthService";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();

  const [signupform, setsignupform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const gobacktologin = () => {
    navigate("/");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "username") {
      setsignupform({ ...signupform, username: value });
    }

    if (name === "email") {
      setsignupform({ ...signupform, email: value });
    }

    if (name === "password") {
      setsignupform({ ...signupform, password: value });
    }
  };

  const signupfunction = async () => {
    let payload = {
      username: signupform.username,
      email: signupform.email,
      password: signupform.password,
    };

    let result = await SignupService(payload);

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Created User",
        text: "User created successfully",
      });
      navigate("/");
    } else if (result.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${result.response.data.message}`,
      });
    }
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
                onChange={onInputChange}
              />

              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                className="forminp"
                onChange={onInputChange}
              />

              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter password"
                className="forminp"
                onChange={onInputChange}
              />

              <button className="btn btn-success" onClick={signupfunction}>
                Signup
              </button>

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
