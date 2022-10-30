/** @format */

import React, { useState, useEffect, useRef } from "react";
import ForumDataService from "../../services/forum.service";
import { Link, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import UploadImages from "../image_upload";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from "react-bootstrap/Form";
import Discussion from "./Discussion";
import Alert from "../Alert";
import "./Forum.css";

const styles = {
  card: {
    backgroundColor: "#B7E0F2",
    borderRadius: 55,
    padding: "2rem",
  },
  cardImageForum: {
    objectFit: "cover",
    borderRadius: 55,
    width: "100%",
    height: "20vh",
  },
  cardImageProfile: {
    objectFit: "cover",
    roundedCircle: "w-5",
    width: "30px",
  },
  mt0: {
    marginTop: "0 !important",
  },
};

const Forums = () => {
  const { id } = useParams();
  // console.log(id)
  const initialSubForum = {
    id: null,
    title: "",
    content: "",
    forumId: id,
  };

  const [forum, setForums] = useState([]);
  const [subForum, setSubForum] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [user, setUser] = useState([]);

  const [subforum, setSubforum] = useState(initialSubForum);

  const [isShown, setIsShown] = useState(false);
  const [isShownComment, setIsShownComment] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubforum({ ...subforum, [name]: value });
    // setSelectValue(event);
  };

  const saveSubForum = () => {
    var data = {
      title: subforum.title,
      content: subforum.content,
      forumId: subforum.forumId,
    };

    ForumDataService.createSubForum(data).then((response) => {
      setSubforum({
        id: response.data.id,
        title: response.data.title,
        content: response.data.content,
      });
      setSubmitted(true);
      console.log(response.data);
    });

    window.location.reload(false);
  };

  const handleClick = (event) => {
    console.log(event.id);
    setIsShown((current) => !current);
  };

  const handleClickComment = (event) => {
    setIsShownComment((current) => !current);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    retrieveForums(id);
    getSubscriptionForum(id);
    getForumUser(id)
  }, []);

  const retrieveForums = async () => {
    const response = await ForumDataService.getDetailForum(id);
    console.log(response.data);

    setForums(response.data);
    // setUser(response.data.users);
    setSubForum(response.data.sub_forums);
  };

  const getForumUser = async ()=> {
    const response = await ForumDataService.getAllForumByUser(id)
    setUser(response.data)
  }

  const getSubscriptionForum = async () => {
    const response = await ForumDataService.getSubscription(id, currentUser.id);
    console.log(response.data);

    setSubscription(response.data);
  };
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef < HTMLInputElement > null;

  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = () => {
    // inputRef.current?.files &&
      // setUploadedFileName(inputRef.current.files[0].name);
  }
  const intialData = {
    id: null,
    userId: null,
    forumId: null,
    status: false,
    isRequest: true,
  };
  // const {forumId} = useParams()
  // const [submitted, setSubmitted] = useState(false);

  const [request, setRequest] = useState(intialData);
  // const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  }
  console.log("forumid", request.forumId);
  const sendRequest = () => {
    setSubmitted(true);

    var data = {
      userId: currentUser.id,
      forumId: id,
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
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card
              style={{ width: "100%" }}
              key={forum.id}
              className=" dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-700">
              <Card.Header>
                {" "}
                <Card.Img variant="top" style={styles.cardImageForum} />
                <Card.Body>
                  <Card.Title className="text-center">
                    Welcome to {forum.title} Room
                  </Card.Title>
                  <Card.Text>{forum.content}</Card.Text>
                </Card.Body>
              </Card.Header>
              <Card
                style={{ width: "100%" }}
                className=" dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-700">
                {/* <Card.Header as="h5" >Featured</Card.Header> */}

                <Card.Body>
                  <Card.Title>Ask a question and start a new topic!</Card.Title>
                  <Card.Text>
                    The youths with similar talents will answer your query.
                    {/* {subscription[0]?.username}
                    {user[0]?.username} */}
                  </Card.Text>
                  {/* {subscription[0] ? (
                    <div> */}
                  {user?.username === subscription[0]?.username ? (
                    <div>
                      <p>This is Youre Room</p>
                      <button
                        type="button"
                        class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleClick}>
                        Add Thread
                      </button>
                    </div>
                  ) : (
                    // <Button variant="dark" disabled>
                    //   This is Youre Room
                    // </Button>
                    <div>
                      <br />
                      {subscription[0]?.isRequest === true &&
                      subscription[0]?.status === false ? (
                        <button
                          type="button"
                          class="text-white text-xs bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          disabled>
                          Waiting Approval
                        </button>
                      ) : (
                        <div>
                          <br />
                          {subscription[0]?.isRequest === true &&
                          subscription[0]?.status === true ? (
                            <div>
                              <p>
                                <strong>
                                  <i>You're already joined this room</i>
                                </strong>
                              </p>
                              <br />
                              <button
                                type="button"
                                class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleClick}>
                                Add Thread
                              </button>
                            </div>
                          ) : (
                            <div>
                              <br />
                              <button
                                type="button"
                                class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={sendRequest}>
                                Request Join
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {/* </div>
                  ): (
                    <div></div>
                  )} */}
                  {/* {subscription.map((el, i) => (
                    <p>{el.forum_subscriptions.forumId}</p>
                    <div>
                        <br />
                    
                      {currentUser.username === el.username ? (
                        <Button variant="dark" onClick={handleClick}>
                          Add Thread
                        </Button>
                      ) : (
                        <div>
                          {el.forum_subscriptions.isRequest === true &&
                          el.forum_subscriptions.status === false ? (
                            <Button variant="dark" disabled>
                              Waiting Approval
                            </Button>
                          ) : (
                            <div>
                              {el.forum_subscriptions.isRequest === true &&
                              el.forum_subscriptions.status === true ? (
                                <Button variant="dark" onClick={handleClick}>
                                  Add Thread
                                </Button>
                              ) : (
                                <div>
                                <hp><i>Welcome!, Now <strong>{currentUser.username}</strong> can create any thread</i></hp>
                              
                              </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))} */}
                </Card.Body>
                {/* <Card.Body>
                  <Discussion />
                </Card.Body> */}
                <Card.Footer>
                  {isShown && (
                    <>
                      {/* <ReactQuill /> */}
                      <Card.Body>
                        <div class="mb-6">
                          <label
                            for="base-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleInputChange}
                          />
                        </div>
                        <label
                          for="message"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Your Content
                        </label>
                        <textarea
                          id="content"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          rows={3}
                          type="text"
                          name="content"
                          onChange={handleInputChange}
                          placeholder="Leave a comment..."></textarea>
                      </Card.Body>
                      {/* </Card.Body> */}
                      <Card.Footer>
                        <br />
                        <button
                          type="button"
                          class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={saveSubForum}>
                          Create
                        </button>
                      </Card.Footer>
                    </>
                  )}
                </Card.Footer>
              </Card>

       

              {/* <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body> */}
            </Card>
          </Col>
          <Col>
          {subForum?.map((el, i) => (
                <div>
                  <div className="rounded-lg border border-gray-200 w-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-700">
                    <div class="w-full flex justify-between p-3">
                      <div class="flex">
                        <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                          <img
                            src="https://avatars0.githubusercontent.com/u/38799309?v=4"
                            alt="profilepic"
                          />
                        </div>
                        <span class="pt-1 ml-2 font-bold text-sm">
                          {forum?.users[0].username}
                        </span>
                      </div>
                      <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
                        <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
                      </span>
                    </div>

                    <div class="px-3 pb-2">
                      {/* <div class="pt-2">
                      <i class="far fa-heart cursor-pointer"></i>
                      <span class="text-sm text-gray-400 font-medium">
                        12 likes
                      </span>
                    </div> */}
                      <div class="pt-1">
                        <div class="mb-2 text-sm">
                          <span class="font-medium mr-2">
                            {" "}
                            {forum?.users[0].username}
                          </span>{" "}
                          {el.content}
                        </div>
                      </div>
                      <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
                        {el.forum_posts.length} comments
                      </div>
                      {/* <div class="mb-2">
                      <div class="mb-2 text-sm">
                        <span class="font-medium mr-2">razzle_dazzle</span>{" "}
                        Dude! How cool! I went to New Zealand last summer and
                        had a blast taking the tour! So much to see! Make sure
                        you bring a good camera when you go!
                      </div>
                    </div> */}
                    </div>
                  </div>
                  // <br />
                </div>
              ))}
          </Col>
          {/* <Col md="4">
            <Card>
              <Card.Header>Reputation Board</Card.Header>

              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col sm="8">
                      Anton <br />
                      <i>Points: 100 (100%)</i>
                    </Col>
                    <Col>Image here</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm="8">
                      Anton <br />
                      <i>Points: 100 (100%)</i>
                    </Col>
                    <Col>Image here</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm="8">
                      Anton <br />
                      <i>Points: 100 (100%)</i>
                    </Col>
                    <Col>Image here</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer>
                <Card.Link href="#">See 30 More</Card.Link>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header>Top Forums</Card.Header>
              <Card.Body>Card Body</Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
      {/* {currentForum.title} */}
    </>
  );
};

export default Forums;
