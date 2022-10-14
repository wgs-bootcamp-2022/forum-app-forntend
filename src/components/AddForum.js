import React, { useState } from "react";
import ForumDataService from "../services/ForumService";

const AddForum = () => {
  const intialForumState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [forum, setForum] = useState(ForumDataService);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setForum({ ...forum, [name]: value });
  };

  const saveForum = () => {
    const data = {
      title: forum.title,
      description: forum.description
    };

    ForumDataService.create(data)
      .then(response => {
        setForum({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newForum = () => {
    setForum(intialForumState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newForum}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={forum.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={forum.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveForum} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddForum;