/** @format */

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import ForumDataService from "../../services/forum.service";
import AuthService from "../../services/auth.service";
import { Link, useParams, Navigate } from "react-router-dom";

const CreateSubForum = () => {
  const [body, setBody] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [forum, setForums] = useState([]);
    const {id} = useParams()
    console.log(id)
  console.log("ini forum id ",forum.id)
  useEffect(() => {
    retrieveForums();
  }, []);

  const retrieveForums = () => {
    ForumDataService.getAllForum()
      .then((response) => {
        setForums(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const initialSubForum = {
    id: null,
    title: "",
    description: "",
    content: "",
    message: "",
    forumId: null
  };

  const [userChoice, setUserChoice] = useState("");

  const [subforum, setSubForum] = useState(initialSubForum);
  const [selectValue, setSelectValue] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubForum({ ...subforum, [name]: value });
    // setSelectValue(event);
  };

  const saveSubForum = () => {
    var data = {
      title: subforum.title,
      description: subforum.description,
      content: subforum.content,
      message: subforum.message,
      forumId: forum.forumId,
    };

    ForumDataService.createSubForum(data)
      .then((response) => {
        setSubForum({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          content: response.data.content,
          //   published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newSubForum = () => {
    setSubForum(initialSubForum);
    setSubmitted(false);
  };

  return (
    <>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSubForum}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <Row>
            <h3>Add Forum</h3>
            {/* <Form> */}
            <Col md="12">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                value={forum.title}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                name="description"
                value={forum.description}
                onChange={handleInputChange}
              />
            </Col>
            <br />
            <Col md="12">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                id="message"
                name="message"
                value={forum.message}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="12">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                id="content"
                name="content"
                value={forum.content}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="5"></Col>
            <Col md="5"></Col>
            <Col md="2"></Col>
            <br />

            <Col md="12"></Col>
            <br />
          </Row>
          <Button variant="primary" onClick={saveSubForum} type="submit">
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default CreateSubForum;
