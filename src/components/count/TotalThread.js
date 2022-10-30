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


const TotalThread = () => {
  const [count, setCount] = useState([]);

    useEffect(() => {
        countForum();
      }, []);
    const countForum = () => {
        ForumData.countSubForum()
          .then((response) => {
            setCount(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    
    return (
        <Card>
        <Card.Header> Total Thread</Card.Header>
        <Card.Body>
            {count.total_subforum} Thread
        </Card.Body>
      </Card>
    )
}

export default TotalThread