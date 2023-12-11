import axios from "axios";

let baseURL = "http://localhost:4000";
const axiosClient = axios.create({
  baseURL: baseURL,
});

export const ListAllPasswords = async () => {
  try {
    let response = await axiosClient.get("password/get-all-password/1");
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ ListAllPasswords ~ error:", error);
    return error;
  }
};

export const AddNewPassword = async (payload) => {
  try {
    let response = await axiosClient.post(
      "/password/add-new-password",
      payload
    );
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:22 ~ AddNewPassword ~ error:", error);
    return error;
  }
};

// http://localhost:4000/password/get-password-by-id/4
export const ViewPasswordbyId = async (id) => {
  try {
    let response = await axiosClient.get(`/password/get-password-by-id/${id}`);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:35 ~ ViewPasswordbyId ~ error:", error);
    return error;
  }
};

// http://localhost:4000/password/decrypt-password/6
export const DecryptPassword = async (id, payload) => {
  try {
    let response = axios.post(
      `http://localhost:4000/password/decrypt-password/${id}`,
      payload
    );
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:47 ~ DecryptPassword ~ error:", error);
    return error;
  }
};

// http://localhost:4000/password/encrypt-password/6
export const EncryptPassword = async (id, password) => {
  try {
    let response = await axiosClient.post(
      `/password/encrypt-password/${id}`,
      password
    );
    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:47 ~ DecryptPassword ~ error:", error);
    return error;
  }
};

//http://localhost:4000/password/edit-password/3
export const EditPasswordService = async (id, payload) => {
  try {
    let response = await axiosClient.put(
      `/password/edit-password/${id}`,
      payload
    );

    return response;
  } catch (error) {
    console.log("🚀 ~ file: index.js:76 ~ EditPasswordService ~ error:", error);
    return error;
  }
};

//http://localhost:4000/password/delete-password/1
export const PasswordDeleteService = async (id) => {
  try {
    let response = await axiosClient.delete(`/password/delete-password/${id}`);
    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: index.js:91 ~ PasswordDeleteService ~ error:",
      error
    );
    return error;
  }
};
