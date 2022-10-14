import http from "../http-common";
import authHeader from "./auth-header";


const getAll = () => {
  return http.get("/forum", { headers: authHeader() });
};

const get = id => {
  return http.get(`/forums/${id}`);
};

const create = data => {
  return http.post("/forums", data);
};

const update = (id, data) => {
  return http.put(`/forums/${id}`, data);
};

const remove = id => {
  return http.delete(`/forums/${id}`);
};

const removeAll = () => {
  return http.delete(`/forums`);
};

const findByTitle = title => {
  return http.get(`/forum/search/query?title=${title}`);
};

const ForumService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default ForumService