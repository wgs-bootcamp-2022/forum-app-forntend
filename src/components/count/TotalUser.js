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
  import UserData from "../../services/user.service";
// import UserService
const TotalUser = () => {

 const [count, setCount] = useState([]);

    useEffect(() => {
        countForum();
      }, []);
    const countForum = () => {
        UserData.countUser()
          .then((response) => {
            setCount(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    
    return (
        <Card>
        <Card.Header> Total User</Card.Header>
        <Card.Body>
            {count.total_user} User
        </Card.Body>
      </Card>
    )
}

export default TotalUser