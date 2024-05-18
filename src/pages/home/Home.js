import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';
import TextTruncate from 'react-text-truncate';

const Home = () => {
  const [video, setVideo] = useState([]);

  const formattedDate = (time) => {
    const date = new Date(time);
    const options = { month: 'short', day: '2-digit' };
    const formatted = date.toLocaleString('default', options);
    return formatted;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://video-sharing-app-backend-1.onrender.com/video/videos');
        setVideo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Include search in the dependency array

  return (
    <div className="home">
      <div className="container">
        {video.map((item, i) => (
          <div key={i}>
            <Link to={`/video/${item._id}`}>
              <div className="card">
                <div className="thump">
                  <video src={item.video}></video>
                </div>
                <div className="details">
                  <div className="row1">
                    <img src={item.user.image} alt="" height={'30px'} />
                    <TextTruncate element="h6" line={2} truncateText="..." text={item.title} />
                  </div>
                  <div className="row2">
                    <h6>{item.user.name}</h6>
                    <p>posted on {formattedDate(item.createdAt)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
