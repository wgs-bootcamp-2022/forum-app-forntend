import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};
const getAllUserRole = () => {
  return axios.get(API_URL + `user/roles/all`, { headers: authHeader() });
};
const updateUser = (userId) => {
  return axios.put(API_URL+`update/user/${userId}`, { headers: authHeader() })
}
const countUser=() => {
  return axios.get(`/user/count/total`);
}
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUserRole,
  countUser,
  updateUser
}

export default UserService;
