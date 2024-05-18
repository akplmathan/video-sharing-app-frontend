import React, { useEffect } from 'react'
import { IoLogoYoutube } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiVideoAddLine } from "react-icons/ri";
import './navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {

  const user = useSelector((state) => state.userInfo.user);
  return (
    <div className='navbar'>
      <div className="nav-left">
        <Link to={'/'}> <div className="logo">
          <IoLogoYoutube className='y-logo' size='29px' />
          <p>METUBE</p>
        </div></Link>
      </div>
      <div className="nav-center">
        <div className="search">
          <input onChange={e => handleChange(e)} type="text" placeholder='Search...' />
          <div>
            <CiSearch className='search-icon' />
          </div>
        </div>
      </div>
      <div className="nav-right">
        <FaSearch size={20} style={{ color: 'white', cursor: 'pointer' }} className='mob-search' />
        <Link to={'/create-video'}><RiVideoAddLine size={25} style={{ color: 'white', cursor: 'pointer' }} /></Link>
        <Link to={'/profile'}><img src={user ? user.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="" /></Link>
      </div>
    </div>
  )
}

export default Navbar