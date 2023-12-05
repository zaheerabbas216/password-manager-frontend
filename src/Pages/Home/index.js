import React, { useEffect, useState } from "react";
import "./styles.scss";
import Data from "./dummydata.json";
import DataTable from "../../Components/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [addModalShow, setAddModalShow] = useState(false);

  useEffect(() => {
    // console.log("the data is", Data);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddModal = () => setAddModalShow(false);
  const handleShowAddModal = () => setAddModalShow(true);

  const logoutfunction = () => {
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
            <DataTable data={Data} />
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
        <Modal.Body>Form to add new modal</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
