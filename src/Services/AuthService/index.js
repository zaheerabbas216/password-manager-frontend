import React from "react";
import axios from "axios";

let baseURL = "http://localhost:4000";

const axiosClient = axios.create({
  baseURL: baseURL,
});

export const PingService = async () => {
  try {
    let response = await axiosClient.get("/ping");
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:14 ~ PingService ~ error:", error);
    return error;
  }
};

export const LoginService = async (payload) => {
  try {
    let response = await axiosClient.post("/admin/admin-login", payload);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:25 ~ LoginService ~ error:", error);
    return error;
  }
};

export const SignupService = async (payload) => {
  try {
    let response = await axiosClient.post("/admin/add-admin", payload);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:34 ~ SignupService ~ error:", error);
    return error;
  }
};

//http://localhost:4000/admin/verify-user
export const VerifyAccountPassword = async (payload) => {
  try {
    let response = await axiosClient.post("/admin/verify-user", payload);
    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: index.js:44 ~ VerifyAccountPassword ~ error:",
      error
    );
    return error;
  }
};
