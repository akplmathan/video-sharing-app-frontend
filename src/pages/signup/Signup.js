import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {useSnackbar} from 'notistack'
import { AiOutlineCamera } from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom'
import {RotatingLines} from 'react-loader-spinner'

import './style.css'
const Signup = () => {
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendOTP, setSendOTP] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [message,setMesssage] = useState("")
  const [imageFileName,setImageFileName] = useState('')
  const [imgURL,setImgURL] = useState('')
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    let intervalId;

    if (isResendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 1 ? 30 : prevTimer - 1));
      }, 1000);
    } else {
      setTimer(30);
    }

    return () => clearInterval(intervalId);
  }, [isResendDisabled]);

  const handleImageChange = (e) => {
    setImgURL(e.target.files[0])
    const file = e.target.files[0];
    const reader = new FileReader();
    setImageFileName(file?.name|| 'no files choosen')
    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowpassword(!showPassword);
  };
  const ResendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setIsResendDisabled(true);
    try {
      if(!email){
        setLoading(false)
        return setMesssage('Please Enter Email')
      }
      const response = await axios.put(
        "https://video-sharing-app-backend-1.onrender.com/user/signup/verify",
        { email:email }
      );
      setLoading(false)
  if(response.status==200){
    setSendOTP(true);
    enqueueSnackbar("please Check your Email for OTP Message",{variant:'info'})
  }
    
  
    } catch (error) {
      console.log(error.message);
    }

    setTimeout(() => {
      setIsResendDisabled(false);
    }, 30000);
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if(name ==""||email==""||age==""||mobile==""||password==""){
      setLoading(false)
      return setMesssage("Fill The All Required Fields")
    }
    if(!regex.test(email)){
      setLoading(false)
      return setMesssage("please Enter Valid Email")
    }
     setMesssage("")
    if(sendOTP){
      if(!otp){
        setLoading(false)
          return setMesssage('Enter Your OTP')
      }
    }
    const formdata = new FormData();
    formdata.append('name',name);
    formdata.append('age',age);
    formdata.append('email',email);
    formdata.append('mobile',mobile);
    formdata.append('password',password);
    formdata.append('image',imgURL);
    formdata.append('otp',otp);
 const response = await axios.post("https://video-sharing-app-backend-1.onrender.com/user/signup",formdata,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})   

 setMesssage(response.data.msg)
 setLoading(false)
 if(response.data.msg=='user Created Successfully'){
    setMesssage('')
    enqueueSnackbar("User Created SuccessFully ",{variant:"success"})
    navigate('/login')
  }
};
  return (
    <div className="signup">
      <div className="container">
        <h2>Sign Up</h2>
        <form>
          <div className="image1">
            <img
              src={
                image
                  ? image
                  : "https://res.cloudinary.com/dzrk0cozg/image/upload/v1714120488/Profile-PNG-Free-Download_zln07r.png"
              }
              alt=""
             
            />
            <p>{imageFileName}</p>
            <input
            
              type="file"
              name="image"
              style={{ display: 'none' }}
              id="image"
              onChange={handleImageChange}
            />
            <label htmlFor="image" className="custom-file-input">
        <AiOutlineCamera className="camera" style={{top:'70px',position:'absolute',height:'20px',width:"20px",backgroundColor:'green',color:'white', padding:'2px',borderRadius:'50%'}} />
      </label> 
          </div>
          <div className="inputs">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Your Age"
            />
            <input
              type="number"
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile No"
            />
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button className="pass-btn" onClick={(e) => handleShowPassword(e)}>{showPassword?<AiOutlineEye size={20}/> :<AiOutlineEyeInvisible size={20}/>}</button>
            </div>
            {sendOTP ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button onClick={e=>ResendOtp(e)} style={{border:'none',color:'blue',cursor:'pointer',background:'transparent'}} disabled={isResendDisabled}>
                  Resend OTP {timer == 30 ? "" : `in ${timer}`}
                </button>
              </>
            ) : null}
          </div>
          <p className="msg">{message}</p>
          <button className="sub-btn" style={{backgroundColor:`${sendOTP?'green':'blue'}`}} onClick={(e)=>sendOTP && handleSubmit(e) || !sendOTP && ResendOtp(e)}>
            {sendOTP ? (loading? <RotatingLines strokeColor="white"  width="15" strokeWidth="4" />:"Sign Up") : (loading?<RotatingLines strokeColor="white"  width="15" strokeWidth="4" />:"Generate OTP")}
          </button>
          <p>Alrady have an Account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
