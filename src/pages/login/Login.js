import axios from "axios";
import { useSnackbar } from "notistack";
import "./Login.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../../slices/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const[loading,setLoading] = useState(false)
  const user = useSelector((state) => state.userInfo.user);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowpassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("https://video-sharing-app-backend-1.onrender.com/user/login", {
        email,
        password,
      });
        setLoading(false);
      if (response.data.token) {
        enqueueSnackbar("Login Successfully", { variant: "success" });
        localStorage.setItem('token',response.data.token)
        dispatch(verifyToken(response.data.token));
        navigate("/");
        console.log(user);
      } else {
        enqueueSnackbar(`${response.data.msg}`, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input
           
            placeholder="Enter Your Email"
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => handleShowPassword(e)}>
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          {loading? <RotatingLines strokeColor="white"  width="15" strokeWidth="4" />: "Login"}
        </button>
        <p>
          Don`t You have a Account ? <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
