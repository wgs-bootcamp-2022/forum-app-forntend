import React, {useState} from 'react';
import axios from 'axios';
import profileService from "../services/user.service";

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [profile, setProfile] = useState([]);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
    //   const response = await axios({
    //     method: "post",
    //     url: "/profile/image/add",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
        profileService.uploadPicture()
        .then(response => {
            setProfile(response.data);
            console.log(response.data);
          })
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
};

export default Form;