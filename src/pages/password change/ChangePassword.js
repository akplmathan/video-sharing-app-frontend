import React, { useState } from 'react'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './Changepassword.css'
import {RotatingLines} from 'react-loader-spinner'

const ChangePassword = () => {

    const[oldPassword,setOldPassword] = useState('')
    const[newPassword,setNewPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem('token')


    const{enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const handlePSChange = async()=>{
        try {
            setLoading(true)
            if(!oldPassword || !newPassword){
                setLoading(false)
                return enqueueSnackbar('please Enter Password',{variant:'warning'})
            }
            if(newPassword.length<8){
                setLoading(false);
                return enqueueSnackbar('Password Must be have 8 charectors',{variant:'error'})
            }
            const response = await axios.put('https://video-sharing-app-backend-1.onrender.com/user/change-password', { oldPassword, newPassword },
            {
              headers: {
                // 'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            setLoading(false);
            if(response.status==201){
                enqueueSnackbar('Password SuccessFully Changed',{variant:'success'})
                navigate('/profile')
            }
            else{
                enqueueSnackbar(`${response.data.msg}`,{variant:'error'})
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='pschange'>
        <div className="container">
            <h2>Change Password</h2> 
            <div className="inputs">
            <label htmlFor="old-pass">Enter Old Password</label>
                <input type="text" id='old-pass' onChange={(e)=> setOldPassword(e.target.value)}/>
            
            <label htmlFor="new-pass">Enter New Password</label>
                <input type="text" id='new-pass' onChange={(e)=> setNewPassword(e.target.value)} />
            
            
            </div>    
            <button onClick={handlePSChange}>{loading ? <RotatingLines strokeColor='white' width='20'/> : 'Change Password'}</button>
        </div>
    </div>
  )
}

export default ChangePassword