import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";

import './myvideo.css'

const MyVideo = ({setLoading,loading}) => {
  const [video, setVideo] = useState([]);
  const token = localStorage.getItem("token");
    const{enqueueSnackbar} = useSnackbar()
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://video-sharing-app-backend-1.onrender.com/video/my-videos",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setVideo(response.data);
    };
    fetchData();
  }, [loading]);
const handleDelete=async(id)=>{
    setLoading(true)
    const response = await axios.delete(`https://video-sharing-app-backend-1.onrender.com/video/delete/${id}`,{
        headers:{
            Authorization:token
        }
    })
        
    setLoading(false)
    if(response.status==201){
     enqueueSnackbar('Video Removed SuccessFully',{variant:'success'})   
    }
}
  
  return (
    <div className="my-video">
      {
        video && <div className="container">
        {video.map((item, i) => {
          return (
            <div className="video" key={i} >
              <Link to={`/video/${item._id}`}><div className="left" key={i}>
                <div>
                  <video src={item.video} height="100px"></video>
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div></Link>
              <div className="right">
                <button onClick={()=>handleDelete(item._id)}>{loading ?  item.id && <RotatingLines strokeColor="white" width="30"/> ||<><MdDelete size={30}/><span>Delete Video</span></> :<><MdDelete size={30}/><span>Delete Video</span></>}</button>
              </div>
            </div>
          );
        })}
      </div>
      }{
    video.length==0 && <p>No Video Found</p>      }
    </div>
  );
};

export default MyVideo;
