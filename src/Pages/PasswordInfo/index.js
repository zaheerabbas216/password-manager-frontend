import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles.scss";
import { FaEye, FaEyeSlash, FaEllipsisV } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { VerifyAccountPassword } from "../../Services/AuthService";
import Swal from "sweetalert2";
import {
  DecryptPassword,
  EditPasswordService,
  EncryptPassword,
  PasswordDeleteService,
  ViewPasswordbyId,
} from "../../Services/PasswordService";

const PasswordInfo = () => {
  const navigate = useNavigate();

  const state = useLocation();

  const [recordData, setRecordData] = useState({});

  const [verifyUserPassword, setVerifyUserPassword] = useState("");

  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const [isPasswordEncrypted, setIsPasswordEncrypted] = useState(true);

  const handleCloseVerifyPassword = () => setShowVerifyPassword(false);
  const handleShowVerifyPassword = () => setShowVerifyPassword(true);

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  useEffect(() => {
    getPasswordByid();
  }, []);

  const getPasswordByid = async () => {
    let result = await ViewPasswordbyId(state?.state?.record.app_id);

    if (result.status === 200) {
      setRecordData(result?.data?.data[0]);
    } else {
      console.log("error getting the app id", result);
    }
  };

  const goback = () => {
    navigate("/home");
  };

  const verfiyPassword = () => {
    handleShowVerifyPassword();
  };

  const handlePasswordChange = (e) => {
    let { name, value } = e.target;
    setVerifyUserPassword(value);
  };

  const verifyPasswordfun = async () => {
    let accountdata = JSON.parse(localStorage.getItem("user"));

    let payload = {
      email: accountdata.email,
      password: verifyUserPassword,
    };

    let result = await VerifyAccountPassword(payload);

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Verified",
        text: "Password verified successfully",
      });
      showPasswordFun(recordData);
      handleCloseVerifyPassword();
    } else if (result.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${result?.response?.data?.message}`,
      });

      console.log("error", result);
    }
  };

  const showPasswordFun = async (data) => {
    let id = data.app_id;
    let payload = {
      password: data.password,
    };

    let result = await DecryptPassword(id, payload);

    if (result.status === 200) {
      setRecordData({ ...recordData, password: result.data.passsword });
      setIsPasswordEncrypted(false);
      Swal.fire({
        icon: "success",
        title: "Depcrypted",
        text: "Password decrypted successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${result.response.data.message}`,
      });
    }
  };

  const hidePasswordFun = async (data) => {
    let id = recordData.app_id;
    let payload = {
      password: recordData.password,
    };

    let result = await EncryptPassword(id, payload);

    if (result.status === 200) {
      setRecordData({ ...recordData, password: result.data.passsword });
      Swal.fire({
        icon: "success",
        title: "Encrypted",
        text: "Password encrypted successfully",
      });
      setIsPasswordEncrypted(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${result.response.data.message}`,
      });
    }
  };

  const [showAns, setShowAns] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const showhideans = () => {
    setShowAns(!showAns);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const [editrecordData, setEditRecordData] = useState({});

  const handleShowEdit = (data) => {
    setEditRecordData(data);
    setShowEdit(true);
  };

  const handleeditinput = (e) => {
    let { name, value } = e.target;
    if (name === "username") {
      setEditRecordData({ ...editrecordData, username: value });
    }
    if (name === "email") {
      setEditRecordData({ ...editrecordData, email: value });
    }

    if (name === "password") {
      setEditRecordData({ ...editrecordData, password: value });
    }
    if (name === "phone") {
      setEditRecordData({ ...editrecordData, phone: value });
    }
    if (name === "security_question") {
      setEditRecordData({ ...editrecordData, security_question: value });
    }
    if (name === "security_answer") {
      setEditRecordData({ ...editrecordData, security_answer: value });
    }
  };

  const handleSavefunction = async () => {
    let result = await EditPasswordService(
      editrecordData.app_id,
      editrecordData
    );

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Edited",
        text: "Edited the password successfully!",
      });
      handleCloseEdit();
      getPasswordByid();
    } else if (result.status === 400) {
      console.log("error updating the password", result);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating the password",
      });
    }
  };

  const handleDeleteFunciton = async () => {
    // handleCloseDelete()

    let result = await PasswordDeleteService(recordData.app_id);

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Deleted Password Successfully!",
      });

      navigate("/home");
    } else if (result.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error deleting the password",
      });
      console.log("error --", result);
    } else {
      console.log("error", result);
    }
  };

  return (
    <>
      <div className="mainpasswordinfo">
        <div className="container">
          <div className="my-3">
            <div className="d-flex align-items-center">
              <FaArrowLeft className="backarrow" onClick={goback} />
              <h4 className="m-0 mx-2">Password Info</h4>
            </div>

            <div className="my-3 w-100 d-flex align-items-center justify-content-center">
              <div className="card p-2 w-50">
                <div className="text-end">
                  <FaEllipsisV
                    style={{ cursor: "pointer" }}
                    data-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <div class="dropdown-menu">
                    <a
                      class="dropdown-item"
                      onClick={() => handleShowEdit(recordData)}
                    >
                      Edit
                    </a>
                    <a class="dropdown-item" onClick={handleShowDelete}>
                      Delete
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex flex-column">
                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Username
                      </label>

                      <p className="recorddata">{recordData?.username}</p>
                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Email
                      </label>

                      <p className="recorddata">{recordData?.email}</p>

                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Password
                      </label>

                      <div className="viewpassworddiv">
                        <p className="recorddata">{recordData?.password}</p>

                        {isPasswordEncrypted === true ? (
                          <>
                            <>
                              <FaEye
                                className="iconclass"
                                onClick={() => verfiyPassword()}
                              />
                            </>
                          </>
                        ) : (
                          <>
                            <>
                              <FaEyeSlash
                                className="iconclass"
                                onClick={() => hidePasswordFun()}
                              />
                            </>
                          </>
                        )}
                      </div>

                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        App Name
                      </label>

                      <p className="recorddata">{recordData?.app_name}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column">
                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Phone
                      </label>

                      <p className="recorddata">{recordData?.phone}</p>

                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Security Question
                      </label>

                      <p className="recorddata">
                        {recordData?.security_question}
                      </p>

                      <label htmlFor="" style={{ fontWeight: "600" }}>
                        Security Answer
                      </label>

                      <div className="recordinpdiv">
                        <input
                          type={!showAns ? "password" : "text"}
                          className="recorddatainput"
                          disabled
                          value={recordData?.security_answer}
                        />

                        {!showAns ? (
                          <>
                            <FaEye
                              className="inpeyeicon"
                              onClick={showhideans}
                            />
                          </>
                        ) : (
                          <>
                            <FaEyeSlash
                              className="inpeyeicon"
                              onClick={showhideans}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal for verify password */}
      <Modal show={showVerifyPassword} onHide={handleCloseVerifyPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2">
            <p>Please enter your account password.</p>

            <input
              type="password"
              name="verifypassword"
              id="verifypassword"
              onChange={handlePasswordChange}
              className="inputag"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVerifyPassword}>
            Close
          </Button>
          <Button variant="primary" onClick={verifyPasswordfun}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Edit your password info</h5>

            <div className="my-2">
              <div className="d-flex flex-column">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="inputtag"
                  defaultValue={editrecordData?.username}
                  onChange={handleeditinput}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="inputtag"
                  defaultValue={editrecordData?.email}
                  onChange={handleeditinput}
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inputtag"
                  defaultValue={editrecordData?.password}
                  onChange={handleeditinput}
                />
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="inputtag"
                  defaultValue={editrecordData?.phone}
                  onChange={handleeditinput}
                />
                <label htmlFor="">Security Question</label>
                <input
                  type="text"
                  name="security_question"
                  id="security_question"
                  className="inputtag"
                  defaultValue={editrecordData?.security_question}
                  onChange={handleeditinput}
                />
                <label htmlFor="">Security Answer</label>
                <input
                  type="text"
                  name="security_answer"
                  id="security_answer"
                  className="inputtag"
                  defaultValue={editrecordData?.security_answer}
                  onChange={handleeditinput}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavefunction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the password?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteFunciton}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordInfo;
