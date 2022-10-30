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
  import ForumData from "../../services/forum.service";


const TotalUser = () => {
  const [count, setCount] = useState([]);

    useEffect(() => {
        countForum();
      }, []);
    const countForum = () => {
        ForumData.countForum()
          .then((response) => {
            setCount(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    
    return (
        <Card>
        <Card.Header> Total Forum</Card.Header>
        <Card.Body>
            {count.total_forum} Forum
        </Card.Body>
      </Card>
    )
}

export default TotalUser