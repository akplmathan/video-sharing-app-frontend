import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import MyVideo from "../my videos/MyVideo";
import { RotatingLines } from "react-loader-spinner";
import './profile.css'
import { MdModeEdit } from "react-icons/md";
import { IoIosKey } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropupCircle,IoIosArrowDropdownCircle } from "react-icons/io";


const Profile = () => { 
 
    
  const user = useSelector((state) => state.userInfo.user);
 
 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isLogout, setIsLogout] = useState(false);
  const[showMyVideo,setShowMyVideo] = useState(false);
  const[loading,setLoading] = useState(false)

  useEffect(()=>{ 
    
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    setIsLogout(false);
  };
  return (
    <div className="profile">
      <div className="container">
        {isLogout && (
          <div className="action">
            <div className="act">
            <h4>Are You Sure Want to Logout ?</h4>
            <div className="div">
              <button onClick={() => handleLogout()} className="logout">Logout</button>
              <button onClick={() => setIsLogout(false)}>Cancel</button>
             
            </div>
            </div>
          </div>
        )}
        {
          loading && <div className="act"><RotatingLines strokeColor="grey"/> 
          <h3>Deletting video...</h3></div>
        }
        <div className="image">
          <img src={user.image} alt=""  height='100px'/>
        </div>
        <button className="profile-edit" onClick={()=> navigate('/profile-update')}><MdModeEdit/> Edit Profile</button>
        <div className="details">
          <h4>Name : {user.name}</h4>
          <h4>Email : {user.email}</h4>
          <h4>Age : {user.age}</h4>
          <h4>Mobile No : {user.mobile}</h4>
        </div>
        <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}} onClick={()=>{setShowMyVideo(!showMyVideo)}}>MY Videos {showMyVideo ? <IoIosArrowDropupCircle size={25}/> :<IoIosArrowDropdownCircle size={25}/>}</h3>
        {showMyVideo && <MyVideo loading={loading} setLoading={setLoading}/>} 
        <div className="actions">
          <Link to={"/change-password"}>
            <button className="ps"><IoIosKey/> Change password</button>
          </Link>
          <button  onClick={() => setIsLogout(true)}><CiLogout/> Logout</button>
          <Link to={"/delete-account"}>
            <button ><MdDelete/> Delete Account</button>
          </Link>
        </div>
        
        
      </div>
    </div>
  );
};

export default Profile;
