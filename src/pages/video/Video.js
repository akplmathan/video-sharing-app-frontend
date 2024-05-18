import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import './video.css';
import { FaArrowCircleLeft } from "react-icons/fa";
import TextTruncate from "react-text-truncate";



const Video = () => {
  const [video, setVideo] = useState({});
  const [user, setUser] = useState({});
  const [like, setLikes] = useState("");
  const [likeAction, setLikeAction] = useState("");
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const User = useSelector((state) => state.userInfo.user);

  const navigate = useNavigate();

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: window.location.href
        });
        console.log('Successfully shared');
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  const handleLikeButton = async () => {
    if (User) {
      const response = await axios.put(
        `https://video-sharing-app-backend-1.onrender.com/video/like/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status == 201) {
        setLikeAction('active')
      } else {
        setLikeAction('')
      }
    } else {
      navigate("/profile")
    }
  };

  useEffect(() => {
    var fetchData = async () => {
      const response = await axios.get(
        `https://video-sharing-app-backend-1.onrender.com/video/videos/${id}`
      );
      setUser(response.data.user);
      setVideo(response.data);
      setLikes(response.data.like.length);
    };
    fetchData();
  }, [id, handleLikeButton]);

  return (
    <div className="video-container">
      <div className="container">

        <button className='back' onClick={()=>navigate('/')}><FaArrowCircleLeft size={35}/></button>
        <div className="video"> 
          <video src={video.video} controls={true} autoPla
          y></video>
        </div>
        <div className="details">
        <TextTruncate
                    element='h3'
                    line={2}
                    truncateText='...'
                    text={video.title}
                    />
          <div className="div">
            <div className="row1">
              <img src={user.image} alt="" />
              <p>{user.name}</p>
            </div>
            <div className="row2">
              <button  onClick={handleLikeButton} className={likeAction} >
                <p style={{fontSize:'25px'}} >{like}</p>
                <BiSolidLike size={28} className={likeAction} />
              </button>
              <button onClick={share}><IoMdShareAlt size={28}/></button>

            </div>
            
          </div>
          <p>{video.description}</p>
        </div>

      </div>
    </div>
  );
};

export default Video
