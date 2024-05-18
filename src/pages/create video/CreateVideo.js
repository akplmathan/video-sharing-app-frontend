import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import './createVideo.css'

const CreateVideo = () => {
  const user = useSelector((state) => state.userInfo.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleCreateVideo = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("description", description);

      const response = await axios.post(
        `https://video-sharing-app-backend-1.onrender.com/video/create-video/${user._id}`,
        formData
      );
      setLoading(false);
      if (response.status == 201) {
        enqueueSnackbar("Video Created SuccessFully", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(`${response.data.msg}`, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-video">
      <div className="container">
        <h2 style={{textAlign:'center',marginBottom:'15px'}}>Upload Video</h2>
        {loading && (
          <div className="loading">
            <RotatingLines strokeColor="white" />
            <h4>Please Wait Video Uploading...</h4>
          </div>
        )}
        {video && <div className="video1"><video height='200px' src={URL.createObjectURL(video)} controls={true} /></div>}
        <div className="inputs">
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="desc">
            Description
            <input
              type="text"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="video">
          
          <label htmlFor="video">
            Choose Video
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </label>
        </div>
        <button onClick={handleCreateVideo}>Create Video</button>
      </div>
    </div>
  );
};

export default CreateVideo;
