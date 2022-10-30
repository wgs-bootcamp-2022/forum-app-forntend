/** @format */

import React, { useState, useEffect } from "react";
// import ForumDataService from "../services/forum.service";
import ForumDataService from "../../services/forum.service";
// import UserService from "../services/user.service";
import { useParams, Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ResponseJoin from "./ResponseJoin";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import TotalUser from "./TotalUser";
// import TotalForum from "./TotalForum";
// import TotalComment from "./TotalComment";
// import TotalThread from "./TotalThread";

import { useSelector } from "react-redux";
import Log from "./Log";
const styles = {
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
};
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const [forums, setForums] = useState([]);

  const [user, setUser] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const id = currentUser.id;
  console.log("ini user id ", id);

  useEffect(() => {
    retrieveForums(id);
    // onDelete(id)
  }, []);

  const retrieveForums = (id) => {
   ForumDataService.getAllForumByUser(id)
   .then(response => {
    setUser(response.data);
    setForums(response.data.forums);
   })
    .catch((err) => {
      console.log(err)
    })

 
  };
  const onDelete = (id) => {
    ForumDataService.removeForum(id);
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row>
        <Col md="3">{/* <TotalUser /> */}</Col>
        <Col md="3">{/* <TotalForum /> */}</Col>
        <Col md="3">{/* <TotalComment /> */}</Col>
        <Col md="3">{/* <TotalThread /> */}</Col>
      </Row>
      <Row>
        <h3>Table Forum</h3>
        <Col md="12">
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      No
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      ID
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Forum Title
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Description
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Content
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Forum Created
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Thread
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    <div class="flex items-center">
                      Type
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-1 w-3 h-3"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512">
                          <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {forums &&
                  forums.map((forum, index) => (
                    <tr
                      key={forum.id}
                      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      {/* <th
                        scope="row"
                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                      </th> */}
                      <td class="py-4 px-6">{index + 1}</td>
                      <td class="py-4 px-6">{forum.id}</td>
                      <td class="py-4 px-6">{forum.title}</td>
                      <td class="py-4 px-6">{forum.description}</td>
                      <td class="py-4 px-6">{forum.content}</td>
                      <td class="py-4 px-6">
                        {forum.createdAt.substring(0, 10)}
                      </td>
                      <td>
                        <Link to={`/forum/subforum/all/${forum.id}`}>
                          {forum.sub_forums.length} Thread{" "}
                        </Link>{" "}
                      </td>
                      <td class="py-4 px-6">{forum.type}</td>
                      <td class="py-4 px-6">{forum.category}</td>

                      <td class="py-4 px-6">
                        <Button
                          variant="dark"
                          // onClick={() => {
                          //   if (data.roles[0].name === "superadmin") {
                          //     setModalShow(false);
                          //   } else {
                          //     setModalShow(true);
                          //   }
                          // }}
                          // onClick={handleOpen}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          variant="dark"
                          onClick={() => onDelete(forum.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
          <Button variant="primary">
          <Link to={`/forum/add`} className="nav-link">
            Add Forum
          </Link>
          
        </Button>
        <br />
        <br />

        </Col>
        <Col md="12">
          <ResponseJoin />
        </Col>

        <Col md="12">
              <Log />
        </Col>
        <Col md="6">
          <Card>
            <Card.Header>Statistics</Card.Header>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <Card.Header>Statistics</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardAdmin;
