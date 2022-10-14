/** @format */

import { useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import UserDataServide from "../services/user.service";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  // MDBBreadcrumb,
  // MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Profile = () => {
  const { id } = useParams();
  // console.log(id)
  const initialUserState = {
    id: null,
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
    image_profile: {
      filename: "",
      pathfile: "",
    },
    published: false,
  };
  const initialImageState = {
    filename: "null",

    published: false,
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [currentImage, setCurrentImage] = useState("");

  const [message, setMessage] = useState("");
  const { user: currentRole } = useSelector((state) => state.auth);

  const getUserbyId = async (id) => {
    const response = await UserDataServide.getUserProfile(id);
    setCurrentUser(response.data);
  };

  console.log(currentImage);
  useEffect(() => {
    getUserbyId(id);
  }, []);

  // if (!currentUser) {
  //   return <Navigate to="/" />;
  // }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-1">
        {/* <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <a href='#'>Home</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="#">User</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow> */}

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={currentUser.image_profile.filepath}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-1">
                  Join at {currentUser.createdAt.substring(0, 10)}
                </p>

                <p className="text-muted mb-4">
                  <strong>{currentUser.address}</strong>
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline className="ms-1">
                    200 Followers
                  </MDBBtn>
                  <MDBBtn outline className="ms-1">
                    20 Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            {/* <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard> */}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <strong>{currentUser.name}</strong>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <strong>{currentUser.email}</strong>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <strong>{currentUser.phone}</strong>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Mobile</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                </MDBCol>
              </MDBRow> */}
                {/* <hr /> */}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <strong>{currentUser.address}</strong>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                {/* <MDBCardBody>
                  <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                  </MDBProgress>
                </MDBCardBody> */}
                          <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
              </MDBCard>
            </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        My Forum List
                      </span>
                    </MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}>
                      Web Design
                    </MDBCardText>
                    {/* <MDBProgress className="rounded">
                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                  </MDBProgress> */}

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}>
                      Website Markup
                    </MDBCardText>
                    {/* <MDBProgress className="rounded">
                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                  </MDBProgress> */}

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}>
                      One Page
                    </MDBCardText>
                    {/* <MDBProgress className="rounded">
                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                  </MDBProgress> */}

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}>
                      Mobile Template
                    </MDBCardText>
                    {/* <MDBProgress className="rounded">
                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                  </MDBProgress> */}

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}>
                      Backend API
                    </MDBCardText>

                    {/* <MDBProgress className="rounded">
                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                  </MDBProgress> */}
                    {/* <nav aria-label="Page navigation example"> */}
                <hr />

                      <MDBPagination className="mb-0">
                        <MDBPaginationItem>
                          <MDBPaginationLink href="#">
                            Previous
                          </MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                          <MDBPaginationLink href="#">1</MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                          <MDBPaginationLink href="#">2</MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                          <MDBPaginationLink href="#">3</MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                          <MDBPaginationLink href="#">Next</MDBPaginationLink>
                        </MDBPaginationItem>
                      </MDBPagination>
                    {/* </nav> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
