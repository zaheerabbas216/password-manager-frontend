import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../Services/AuthService";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { storeUser } from "../../store/reducers/passwordReducer";

const user = {
  email: "test",
  password: "test",
};

const Login = () => {
  const initaildata = useSelector((state) => state.password);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const loginFunction = async () => {
    // dispatch(storeUser(user));

    let credentials = {
      email: payload.email,
      password: payload.password,
    };

    if (credentials.email === "" && credentials.password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter the email and password",
      });
    } else if (credentials.email === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter the email",
      });
    } else if (credentials.password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter the password",
      });
    } else {
      let response = await LoginService(credentials);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Logged In",
          text: "Logged in successfully",
        });
        dispatch(storeUser(response?.data?.data[0]));
        localStorage.setItem("user", JSON.stringify(response?.data?.data[0]));
        navigate("/home");
      } else if (response.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${response.response.data.message}`,
        });
      }
    }
  };

  const gotoSignup = () => {
    navigate("/signup");
  };

  //set to form
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "email") {
      setPayload({ ...payload, email: value });
    }
    if (name === "password") {
      setPayload({ ...payload, password: value });
    }
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
              onChange={handleInputChange}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="forminp"
              onChange={handleInputChange}
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
