import http from "./http_common";
import authHeader from "./auth.header";

import axios from "axios";

const API_URL = "http://localhost:5000/";

const getAllForum = () => {
  return http.get("/forum", { headers: authHeader() });
};

const getAllForumRequest = () => {
  return http.get("/forum/request", { headers: authHeader() });
};

const getSubForumById = (id) => {
  return http.get(`/forum/subforum/${id}`, { headers: authHeader() });
};
const getLogs = () => {
  return http.get(`/log`, { headers: authHeader() });
};

const createSubForum = (data) => {
  return http.post(`/forum/sub_forum`, data, { headers: authHeader() });
};

const requestJoinForum = (data) => {
  return http.post(`/forum/join`, data, { headers: authHeader() });
};

const createComment = (data) => {
  return http.post(`/forum/sub_forum/comment`, data, { headers: authHeader() });
};
const getAllForumByUser = (id) => {
  return http.get(`/forum/user/all/${id}`, {header: authHeader()});
};

const responseJoin = (data) => {
  return http.put(`/forum/join/response`, data, {header: authHeader()});
};


const getDetailForum = id => {
  return http.get(`/forum/subforum/all/${id}`, { headers: authHeader() });
};

const getSubscription = (forumId, userId) => {
  return http.get(`/forum/subscription/all/${forumId}/${userId}`,{ headers: authHeader() });

}
const getDiscussion = id => {
  return http.get(`/forum/subforum/discussion/all/${id}`, { headers: authHeader() });
};


const createForum = (data) => {
  return http.post(`/forum/add`, data, { headers: authHeader() });
};




const update = (id, data) => {
  return http.put(`/forums/${id}`, data);
};

const removeForum = id => {
  return http.delete(`/forum/delete/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/forums`);
};

const findByTitle = title => {
  return http.get(`/forum/search/query?title=${title}`);
};

const countForum =() => {
  return http.get(`/forum/count/total`);
}

const countSubForum =() => {
  return http.get(`/subforum/count/total`);
}

const countComment=() => {
  return http.get(`/comment/count/total`);
}



const ForumService = {
  getAllForum,
  // getForumById,
  getAllForumRequest,
  getSubForumById,
  createComment,
  createSubForum,
  responseJoin,
  createForum,
  getDiscussion,
  update,
  removeForum,
  removeAll,
  findByTitle,
  getDetailForum,
  getAllForumByUser,
  countForum,
  countSubForum,
  countComment,
  requestJoinForum,
  getSubscription,
  getLogs
};

export default ForumService