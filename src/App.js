import React, { useEffect, useState } from "react";
import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Video from "./pages/video/Video";
import CreateVideo from "./pages/create video/CreateVideo";
import { verifyToken } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ChangePassword from "./pages/password change/ChangePassword";
import DeleteAccount from "./pages/delete account/DeleteAccount";
import ProfileUpdate from "./pages/Update Profile/ProfileUpdate";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token));
    }
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar className="nav" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:id" element={<Video />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="profile-update" element={<ProfileUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
