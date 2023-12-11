import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data }) => {
  const navigate = useNavigate();

  const gotopasswordDetails = (data) => {
    navigate("/details", { state: { record: data } });
  };

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
          {data.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.app_name}</td>
              <td>{record.email}</td>
              <td>{record.password}</td>
              <td>
                <div className="w-100 text-center">
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() => gotopasswordDetails(record)}
                    title="view"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
