import http from "../http-common";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return http.get("/test");
};

const uploadPicture = () => {
  return http.post("/profile/image/add", {headers: authHeader()})
}

const getUserBoard = () => {
  return http.get("/user", { headers: authHeader() });
};

const getUserProfile = (id) => {
  return http.get(`/profile/details/${id}`, { headers: authHeader() });
};

// const getImageByFilename= (filename) => {
//   return http.get(`/profile/image/${filename}}`, { headers: authHeader() });
// };

const getSeperAdminBoard= () => {
  return http.get("/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return http.get("/admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getSeperAdminBoard,
  getAdminBoard,
  uploadPicture,
  getUserProfile,
  // getImageByFilename
};