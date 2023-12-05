import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DataTable = ({ data }) => {
  const [show, setShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <div className="mt-5">
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>SL No</th>
            <th>App Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.slno}>
              <td>{record.slno}</td>
              <td>{record.app_name}</td>
              <td>{record.email}</td>
              <td>{record.password}</td>
              <td>
                <div className="w-100 text-center">
                  <button
                    className="btn btn-secondary mx-1"
                    onClick={handleShow}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-info mx-1"
                    onClick={handleShowEdit}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* view data */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Password Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Details of your password</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={logoutfunction}>
            Logout
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* edit modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit your password</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={logoutfunction}>
            Logout
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default DataTable;
