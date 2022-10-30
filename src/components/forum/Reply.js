/** @format */

import React, { useState, useEffect } from "react";
import ForumDataService from "../../services/forum.service";
import { Link, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";

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

const Reply = (id) => {
//   const { id } = useParams();
  // console.log(id)
  console.log("ini id discussion",  id.id)
  const subForumId = id.id
  const [getDisc, setGetDisc] = useState([]);
  useEffect(() => {
    getDiscussion(subForumId)
  }, []);
  const getDiscussion = async (subForumId) => {
    const response = await ForumDataService.getDiscussion(subForumId);
    console.log(response.data);
    setGetDisc(response.data);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            {getDisc?.map((el,i) => {

            <Card style={{ width: "100%" }} key={getDisc.id}>
             <Card.Body>
                ini title{el.message}
             </Card.Body>
            </Card>
            })}
          </Col>
        </Row>
      </Container>
      {/* {currentForum.title} */}
    </>
  );
};

export default Reply;
