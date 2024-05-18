import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import './style.css'

const ProfileUpdate = () => {
  const user = useSelector((state) => state.userInfo.user);
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  useEffect(() => {
    setName(user.name);
    setAge(user.age);
    setImgURL(user.image);
    setMobile(user.mobile);
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://video-sharing-app-backend-1.onrender.com/user/user-update`,
        {
          name,
          age,
          image,
          mobile,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      if(response.status ==201){
          enqueueSnackbar('User Updated SuccessFully',{variant:'success'});
          navigate('/profile')
          window.location.reload()
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(imgURL);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImgURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }; 
  return (
    <div className="profile-update">
      <div className="container">
        <div className={loading?"loading":''}>
          {
            loading && <><RotatingLines strokeColor="white"/> <h4>Updatting Profile...</h4></>
          }
        </div>
        <div className="image">
          <img src={imgURL} alt="" />
          <input
            type="file"
            name="image"
            style={{ display: "none" }}
            id="image"
            onChange={(e) => handleImageChange(e)}
          />
          <label htmlFor="image" className="custom-file-input">
            <AiOutlineCamera className="camera" />
          </label>
        </div>
        <div className="inputs">
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="name">
            Age
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label htmlFor="name">
            Mobile
            <input
              type="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
