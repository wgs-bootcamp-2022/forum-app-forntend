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

const styles = {
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
};

const Log = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = () => {
    ForumDataService.getLogs()
      .then((response) => {
        console.log(response.data);
        setLogs(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <Row>
        <h3>Table Logs</h3>
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
                      Client Ip
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
                      Request Method
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
                      End Point
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
                      Status Code
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
                      Content Length
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
                      Response Time
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
                      Created
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
                </tr>
              </thead>
              <tbody>
                {logs &&
                  logs.map((el, i) => (
                    <tr
                      key={el.id}
                      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td class="py-4 px-6">{i + 1}</td>
                      <td class="py-4 px-6">{el.id}</td>
                      <td class="py-4 px-6">{el.username}</td>
                      <td class="py-4 px-6">{el.email}</td>
                      <td class="py-4 px-6">{el.client_ip}</td>
                      <td class="py-4 px-6">{el.request_method}</td>
                      <td class="py-4 px-6">{el.endpoint}</td>
                      <td class="py-4 px-6">{el.status_code}</td>
                      <td class="py-4 px-6">{el.content_length}</td>
                      <td class="py-4 px-6">{el.response_time}</td>
                      <td class="py-4 px-6">{el.createdAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default Log;
