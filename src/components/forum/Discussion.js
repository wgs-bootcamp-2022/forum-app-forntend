/** @format */

import React, { useState, useEffect } from "react";
import ForumDataService from "../../services/forum.service";
import { Link, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import Reply from "./Reply";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from "react-bootstrap/Form";
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

const SubForum = () => {
  const { id } = useParams();
  // console.log(id)

  const [isShown, setIsShown] = useState(false);
  const [subForum, setSubForum] = useState(false);

  const [isShownComment, setIsShownComment] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const initialDiscussion = {
    id: null,
    message: "",
    subForumId: id,
  };
  console.log("ini id", id);
  const [discussion, setDiscussion] = useState(initialDiscussion);

  const handleInputDiscussion = (event) => {
    const { name, value } = event.target;
    setDiscussion({ ...discussion, [name]: value });
    // setSelectValue(event);
  };

  const saveDiscussion = () => {
    var data = {
      message: discussion.message,
      subForumId: discussion.subForumId,
    };

    ForumDataService.createComment(data)
      .then((response) => {
        setDiscussion({
          id: response.data.id,
          message: response.data.message,
          subForumId: response.data.subForumId,
        });
        setSubmitted(true);
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
    // window.location.reload(false);
    setIsShown((current) => !current);
  };

  const handleClick = (event) => {
    console.log(event.id);
    setIsShown((current) => !current);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  // const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    retrieveForums(id);
  }, []);

  const retrieveForums = async (id) => {
    const response = await ForumDataService.getSubForumById(id);
    console.log(response.data);
    setSubForum(response.data);
  };

  const [getDisc, setGetDisc] = useState([]);
  useEffect(() => {
    getDiscussion(id);
  }, []);

  const getDiscussion = (id) => {
    ForumDataService.getDiscussion(id).then((response) => {
      setGetDisc(response.data);
      setSubmitted(true);
    });
    // window.location.reload(false);
  };
  // console.log("ini reply disc", getDisc[0].message);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card style={{ width: "100%" }} key={subForum.id}>
              <Card.Header>
                {" "}
                <Card.Img variant="top" style={styles.cardImageForum} />
                <Card.Body>
                  <Card.Title className="text-center">
                    Welcome to {subForum.title} Room
                  </Card.Title>
                  <Card.Text>{subForum.content}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={handleClick}>
                    Reply
                  </Button>
                </Card.Footer>
              </Card.Header>

              {isShown && (
                <Form style={{ width: "100%" }} className="mt-3">
                  <>
                    <Form.Label htmlFor="inputPassword5">
                      Create Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      id="message"
                      name="message"
                      // value={discussion.message}
                      onChange={handleInputDiscussion}
                    />
                    <Card.Footer>
                      <Button variant="dark" onClick={saveDiscussion}>
                        Send
                      </Button>
                    </Card.Footer>
                  </>
                </Form>
              )}
              {getDisc?.map((el, i) => (
                // <Card.Body>
                <Card style={{ width: "100%" }} key={el.id}>
                  {el.message}

                  <Card.Footer>
                    <Row>
                      <Col sm="11">
                        Created: {el.createdAt.substring(0, 10)}
                      </Col>
                      <Col sm="1">
                        {currentUser? (
                        <Button variant="dark">Delete</Button>

                        ): (
                        <Button variant="dark" disabled>Delete</Button>

                        )}
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
                // </Card.Body>
              ))}
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default SubForum;
