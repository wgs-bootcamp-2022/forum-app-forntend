import React, { useState, useEffect } from "react";
import ForumDataService from "../services/ForumService";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const ForumList = () => {
  const [forums, setForums] = useState([]);
  const [currentForum, setCurrentForum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);


  useEffect(() => {
    retrieveForums();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    // if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === false) {
    //   console.log("Enter key was pressed. Run your function.");
    //   setSearchTitle(searchTitle);

    //   // callMyFunction();
    // }
    
  };

  const retrieveForums = async  () => {
    const response = await ForumDataService.getAll()
    setForums(response.data);

      // .then(response => {
      //   setForums(response.data);
      //   console.log(response.data);
      // })
      // .catch(e => {
      //   console.log(e);
      // });
  };

  const refreshList = () => {
    retrieveForums();
    setCurrentForum(null);
    setCurrentIndex(-1);
  };

  const setActiveForum = (tutorial, index) => {
    setCurrentForum(tutorial);
    setCurrentIndex(index);
  };

  const removeAllForums = () => {
    ForumDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const addForum = () => {
    console.log("oke")
  };

  const findByTitle = async () => {
    const response = await ForumDataService.findByTitle(searchTitle)
  //     .then(response => {
        setForums(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Forums List</h4>

      <ul className="list-group">
        {forums &&
          forums.map((forum, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveForum(forum, index)}
              key={index}
            >
              {forum.title}
            </li>
          ))}
      </ul>
      <button
        className="btn btn-sm btn-primary"
        onClick={addForum}
      >
        Add Forum
      </button>
      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={removeAllForums}
      >
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentForum ? (
        <div>
          <h4>Forum</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentForum.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentForum.description}
          </div>
          <div>
            <label>
              <strong>Picture:</strong>
            </label>{" "}
            {currentForum.picture}
          </div>
          <div>
            <label>
              <strong>Content:</strong>
            </label>{" "}
            {currentForum.content}
          </div>
          <div>
            <label>
              <strong>Tanggal Create:</strong>
            </label>{" "}
            {currentForum.createdAt}
          </div>
          <div>
            <label>
              <strong>Tanggal Update:</strong>
            </label>{" "}
            {currentForum.updatedAt}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentForum.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/forums/" + currentForum.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Forum...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default ForumList;