/** @format */

import React, { useState, useEffect } from "react";
import ForumDataService from "../../services/forum.service";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import CardGroup from "react-bootstrap/CardGroup";
import { useParams, useNavigate } from "react-router-dom";

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
  Modal,
} from "react-bootstrap";
const styles = {
  card: {
    backgroundColor: "#B7E0F2",
    borderRadius: 55,
    padding: "3rem",
  },
  cardImageForum: {
    objectFit: "cover",
    borderRadius: 55,
    width: "50vw",
    height: "20vh",
  },
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
};

function ModalRequest({ forumId, ...other }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log("user ", currentUser.id);
  const intialData = {
    id: null,
    userId: null,
    forumId: forumId,
    status: false,
    isRequest: true,
  };

  const [request, setRequest] = useState(intialData);
  const [submitted, setSubmitted] = useState(false);
  // console.log("forumid", request.forumId);

  const sendRequest = () => {
    var data = {
      userId: currentUser.id,
      forumId: forumId,
      status: false,
      isRequest: true,
    };

    ForumDataService.requestJoinForum(data)
      .then((response) => {
        setRequest({
          id: response.data.id,
          userId: response.data.userId,
          forumId: response.data.forumId,
          status: response.data.status,
          isRequest: response.data.isRequest,
        });
        // setSubmitted(true);
        // navigate(`/forums`);
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
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
            Request Join ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="dark" type="submit" onClick={sendRequest}>
            Yes
          </Button>{" "}
          <Button variant="dark">Cancel</Button>
          <br />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const ForumList = () => {
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
    ForumDataService.getAllForum()
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

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  // if (findByTitle === ""){
  //   window.location.reload();
  // }
  return (
    <>
      <Container>
        <Row col="6">
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
                placeholder="Search Title..."
                value={searchTitle}
                onChange={onChangeSearchTitle}
                required
              />
              <button
                type="button"
                onClick={findByTitle}
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
            <br />
          </form>
        </Row>
        <Row>
          {forums &&
            forums.map((forum, index) => (
              // <Col md="12">
              <Link to={`/forum/subforum/all/${forum.id}`} className="ounded-lg border border-gray-200 w-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-700">
                <a
                  href="#"
                  class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <img
                    class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={forum.image_forum?.filepath}
                    alt=""
                  />
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {forum.title}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                     {forum.description}
                    </p>
                    <a
                      href="#"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      See Room
                      <svg
                        aria-hidden="true"
                        class="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </a>
                <br />
                {/* <ModalRequest
                  forumId={forum.id}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              </Link>
              // </Col>
            ))}
          {/* <Col md="8"></Col>

          <Col md="4">
            <Card>
              <Card.Header>Forum Updated</Card.Header>
              <Card.Body>Card Body</Card.Body>
            </Card>

            <Card>
              <Card.Header>Top Forums</Card.Header>
              <Card.Body>Card Body</Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ForumList;
