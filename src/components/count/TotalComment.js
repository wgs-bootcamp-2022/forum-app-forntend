/** @format */

import React, { useState, useEffect } from "react";

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
// import ForumData from "../services/ForumService";
import ForumData from "../../services/forum.service";

const TotalComment = () => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    countComment();
  }, []);
  const countComment = () => {
    ForumData.countComment()
      .then((response) => {
        console.log(response.data)
        setCount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card>
      <Card.Header> Total Discussion</Card.Header>
      <Card.Body>
        {count.total_comment === '0' ? <p>0 Discussions</p> : <p>{count.total_comment}</p> }
      </Card.Body>
    </Card>
  );
};

export default TotalComment;
