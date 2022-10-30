/** @format */

import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import { useParams, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import TotalComment from "../count/TotalComment";
import TotalThread from "../count/TotalThread";
import TotalForum from "../count/TotalForum";
import TotalUser from "../count/TotalUser";
import ResponseJoin from "../admin/ResponseJoin";
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
const styles = {
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
};

function ModalEditRole({ userId, ...other }) {
  // const {userId} = useParams();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const intialData = {
    userId: null,
    roleId: null,
  };
  const [role, setRole] = useState(intialData);

  // const handleSelect = (e) => {
  //   setRole({ ...role, [e.target.name]: e.target.value });
  // };


  const handleSubmit = () => {
    var data = {
      userId: userId,
      roleId: role,
    };
    console.log(userId)

    // if (setRole.roleId) {
    UserService.updateUser(data)
    .then(
      // () => {
      //   navigate(`/superadmin`);
      //   window.location.reload();
      // },
      (response) => {
        setRole({
          userId: response.data.userId,
          roleId: response.data.roleId
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
            Edit Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <select
              className="form-select"
              aria-label="Default select example"
              name="roleId"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option selected>Select Role</option>
              <option value={2}>Admin</option>
              <option value={1}>User</option>
            </select>
            <Button type="submit" onClick={handleSubmit} variant="primary">
              Save
            </Button>
          </Form>

          <br />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const BoardSuperAdmin = () => {
  const [content, setContent] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const handleOpen = () => {
    setModalShow(true);
  };

  useEffect(() => {
    retrieveUserRole();
  }, []);

  const retrieveUserRole = async () => {
    const response = await UserService.getAllUserRole();
    setContent(response.data);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="3">
            <TotalUser />
          </Col>
          <Col md="3">
            <TotalForum />
          </Col>
          <Col md="3">
            <TotalComment />
          </Col>
          <Col md="3">
            <TotalThread />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="  Search here ..."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Search
                </button>
              </div>
            </form>
            <br />
          </Col>
        </Row>
        <Row>
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
                        Image Profile
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
                        Email
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
                        Address
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
                        Phone
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
                        Role
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
                  {content &&
                    content.map((data, index) => (
                      <tr
                        key={data.id}
                        class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        {/* <th
                        scope="row"
                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                      </th> */}
                        <td class="py-4 px-6">{index + 1}</td>
                        <td class="py-4 px-6">{data.id}</td>
                        <td class="py-4 px-6">
                          {" "}
                          <img
                            src={data.image_profile.filepath}
                            style={styles.cardImageProfile}
                          />
                        </td>
                        {/* <td class="py-4 px-6">{data.name}</td> */}
                        <td class="py-4 px-6">{data.username}</td>
                        <td class="py-4 px-6">{data.email}</td>
                        <td class="py-4 px-6">{data.address}</td>

                        <td class="py-4 px-6">{data.phone}</td>
                        <td class="py-4 px-6">{data.roles[0].name}</td>
                        <td>
                          {data.roles[0].name === "superadmin" ? (
                            <Button variant="secondary" disabled>
                              Edit Role
                            </Button>
                          ) : (
                            <div>
                              <Button variant="primary" onClick={handleOpen}>
                                Edit Role
                              </Button>
                            
                            </div>
                          )}{" "}
                          {data.roles[0].name === "superadmin" ? (
                            <Button variant="secondary" disabled>
                              Deactivate
                            </Button>
                          ) : (
                            <Button variant="primary">Deactivate</Button>
                          )}
                            <ModalEditRole
                                userId={data.id}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                              />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Col>

          <Col md="12">
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
    </>
  );
};

export default BoardSuperAdmin;
