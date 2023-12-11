import React, { useEffect, useState } from "react";
import "./styles.scss";
import Data from "./dummydata.json";
import DataTable from "../../Components/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  AddNewPassword,
  ListAllPasswords,
} from "../../Services/PasswordService";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/reducers/passwordReducer";

const Home = () => {
  //test the redux state
  const initialuserdata = useSelector((state) => state.password);

  //localstorage
  const localstoragedata = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [passwordlist, setPasswordList] = useState([]);
  const [newpassword, setnewpassword] = useState({
    admin_id: "",
    username: "",
    email: " ",
    phone: "",
    password: "",
    security_question: "",
    security_answer: "",
    app_name: "",
  });

  useEffect(() => {
    getallpasswords();
  }, []);

  // to get all passwords
  const getallpasswords = async () => {
    try {
      let result = await ListAllPasswords();

      if (result.status === 200) {
        setPasswordList(result?.data?.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error getting the list of passwords",
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ getallpasswords ~ error:", error);
    }
  };

  const onchangeinput = (e) => {
    let { name, value } = e.target;
    if (name === "username") {
      setnewpassword({ ...newpassword, username: value });
    }
    if (name === "phone") {
      setnewpassword({ ...newpassword, phone: value });
    }

    if (name === "email") {
      setnewpassword({ ...newpassword, email: value });
    }
    if (name === "password") {
      setnewpassword({ ...newpassword, password: value });
    }
    if (name === "security_question") {
      setnewpassword({ ...newpassword, security_question: value });
    }
    if (name === "security_answer") {
      setnewpassword({ ...newpassword, security_answer: value });
    }
    if (name === "app_name") {
      setnewpassword({ ...newpassword, app_name: value });
    }
  };

  const handleSubmit = async () => {
    let payload = {
      admin_id: 1,
      username: newpassword.username,
      email: newpassword.email,
      phone: newpassword.phone,
      password: newpassword.password,
      security_question: newpassword.security_question,
      security_answer: newpassword.security_answer,
      app_name: newpassword.app_name,
    };

    let result = await AddNewPassword(payload);

    if (result.status === 200) {
      setnewpassword({
        admin_id: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        security_question: "",
        security_answer: "",
        app_name: "",
      });
      handleCloseAddModal();
      getallpasswords();
      console.log("added the password successfully");
    } else if (result.response.status === 400) {
      console.log("error addding the password");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddModal = () => setAddModalShow(false);
  const handleShowAddModal = () => setAddModalShow(true);

  const logoutfunction = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="mainHome">
        <div className="container my-5">
          <div className="heading_home">
            <div>
              <h2>Welcome User,</h2>
              <p>here you will find the list of all your saved passwords.</p>
            </div>
            <div>
              <button className="btn btn-info" onClick={handleShow}>
                View Profile
              </button>
            </div>
          </div>
          <div className="cta_add_passwords">
            <button className="btn btn-info" onClick={handleShowAddModal}>
              Add New Password
            </button>
          </div>

          {/* table here */}
          <div className="my-3">
            <DataTable data={passwordlist} />
          </div>
        </div>
      </div>

      {/* modals  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Details of your profile</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={logoutfunction}>
            Logout
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addModalShow} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formaddpassword">
            <div className="d-flex flex-column">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="enter your username"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="enter your email"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="enter your phone"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="enter your password"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">Security Question</label>
              <input
                type="text"
                name="security_question"
                id="security_question"
                placeholder="enter your security question"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">Security Answer</label>
              <input
                type="text"
                name="security_answer"
                id="security_answer"
                placeholder="enter your security answer"
                className="inptag"
                onChange={onchangeinput}
              />
              <label htmlFor="">App Name</label>
              <input
                type="text"
                name="app_name"
                id="app_name"
                placeholder="enter your app name"
                className="inptag"
                onChange={onchangeinput}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
