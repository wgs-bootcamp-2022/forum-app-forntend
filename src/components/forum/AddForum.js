/** @format */

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import ForumDataService from "../../services/forum.service";
import AuthService from "../../services/auth.service";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";

const CreateForum = () => {
  let navigate = useNavigate();

  const [body, setBody] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  const selectOptions = [
    { value: "public", label: "Public" },
    { value: "Private", label: "Private" },
  ];
  const handleBody = (e) => {
    console.log(e);
    setBody(e);
  };

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const initialForum = {
    id: null,
    title: "",
    description: "",
    type: "",
    category: "",
    content: "",
    status: true,
    userId: currentUser.id,
  };
  const [userChoice, setUserChoice] = useState("");
  const [forum, setForum] = useState(initialForum);
  const [selectValue, setSelectValue] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (selectValue) => {
    setSelectValue(selectValue);
  };

  const handleSelect = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForum({ ...forum, [name]: value });
    // setSelectValue(event);
  };
  const saveForum = () => {
    var data = {
      title: forum.title,
      description: forum.description,
      type: type,
      category: category,
      status: forum.status,
      content: forum.content,
      userId: forum.userId,
    };
    console.log(forum);

    ForumDataService.createForum(data)
      .then((response) => {
        setForum({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          content: response.data.content,
          published: response.data.published,
          userId: response.data.userId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newForum = () => {
    setForum(initialForum);
    setSubmitted(false);
  };
  if (submitted) {
    return <Navigate to="/admin" />;
  }
  return (
    <>
      {/* {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newForum}>
            Add
          </button>
        </div>
      ) : ( */}
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
            <Form.Label> Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              name="description"
              value={forum.description}
              onChange={handleInputChange}
            />
          </Col>
          <br />
          <Col md="5">
            <Form.Label>Choose Type</Form.Label>

            <Form.Select
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              value={type}
              onChange={(e) => setType(e.target.value)}>
              <option>Select Type</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="need_approval">Need Approval</option>
            </Form.Select>
          </Col>
          <Col md="5">
            <Form.Label>Choose Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option>Select Category</option>
              <option value="bola">Bola</option>
            </Form.Select>
          </Col>
          <Col md="2">
            <Form.Label>Add Category</Form.Label>
            <br />
            <Button variant="primary" type="submit">
              + Add
            </Button>
          </Col>
          <Col md="6">
            <Form.Label>Upload File</Form.Label>
            {/* <input
              class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p> */}
          </Col>
          <br />
          {/* <Form.Label>Content Message</Form.Label>
            <Col md="12">
              <ReactQuill
                placeholder="spread your message..."
                modules={CreateForum.modules}
                formats={CreateForum.formats}
                onChange={handleBody}
                value={body}
              />
            </Col> */}
          <br />
        </Row>
        <br />
        <Button variant="primary" onClick={saveForum} type="submit">
          Submit
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

CreateForum.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    // ["link", "image"],
    ["code-block"],
    ["clean"],
  ],
};

CreateForum.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  //   "link",
  //   "image",
  "code-block",
];

export default CreateForum;
