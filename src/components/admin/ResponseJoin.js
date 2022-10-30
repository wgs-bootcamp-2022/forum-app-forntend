/** @format */

import React, { useState, useEffect } from "react";
import ForumDataService from "../../services/forum.service";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import CardGroup from "react-bootstrap/CardGroup";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

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
import { findAllByDisplayValue } from "@testing-library/react";
const styles = {
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
};

function ResponseJoinModal({ userId, forumId, ...other }) {
  // const {userId} = useParams();
  console.log(userId, forumId);
  const intialData = {
    userId: null,
    forumId: null,
    status: true,
  };
  const [req, setReq] = useState(intialData);

  const handleSubmit = () => {
    const data = {
      userId: userId,
      forumId: forumId,
      staus: true,
    };
    console.log(userId);

    // if (setRole.roleId) {
    ForumDataService.responseJoin(data)
      .then((response) => {
        setReq({
          userId: response.data.userId,
          forumId: response.data.forumId,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>test</Button> */}
      <Modal
        {...other}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Approval Forum
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <select
              className="form-select"
              aria-label="Default select example"
              name="forumId"
              value={req}
              onChange={(e) => setReq(e.target.value)}>
              <option selected>Select</option>
              <option value={true}>Accept</option>
              <option value={false}>Denied</option>
            </select>
            <Button type="submit" onClick={handleSubmit} variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const ResponseJoin = () => {
  const initialForumState = {
    id: null,
    title: "",
    description: "",
    content: "",
    createdAt: "",
    image_forum: {
      filename: "",
      filepath: "",
    },
    published: false,
  };
  const [modalShow, setModalShow] = React.useState(false);

  const [forums, setForums] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleOpen = () => {
    setModalShow(true);
  };

  useEffect(() => {
    retrieveForums();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveForums = () => {
    ForumDataService.getAllForumRequest()
      .then((response) => {
        setForums(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ForumDataService.findByTitle(searchTitle)
      .then((response) => {
        console.log(response.data);

        setForums(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
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
                  Username
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
                  Forum Type
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
                  Status
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
                  <td class="py-4 px-6">{forum.username}</td>

                  <td class="py-4 px-6">{forum.type}</td>

                  <td class="py-4 px-6">
                    {forum.isRequest === true && forum.status === false ? (
                      <i>
                        <strong>Waiting Approval</strong>
                      </i>
                    ) : (
                      <div>
                        {forum.isRequest === true && forum.status === true ? (
                          <i>
                            <strong>Accepted</strong>
                          </i>
                        ) : (
                          <i></i>
                        )}
                      </div>
                    )}
                  </td>
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
                      onClick={handleOpen}>
                      Update
                    </Button>{" "}
                    <ResponseJoinModal
                      userId={forum.user_id}
                      forumId={forum.id}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    {/* <Button
                            variant="dark"
                            onClick={() => onDelete(forum.id)}
                            // onClick={() => {
                            //   if (data.roles[0].name === "superadmin") {
                            //     setModalShow(false);
                            //   } else {
                            //     setModalShow(true);
                            //   }
                            // }}
                            // onClick={handleOpen}
                          >
                            Delete
                          </Button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ResponseJoin;
