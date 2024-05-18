import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../../slices/userSlice'
import './style.css'

const DeleteAccount = () => {
    const navigate = useNavigate()
    const[confirmText,setConfirmText] = useState('')
    const [loading,setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const user = useSelector(state => state.userInfo.user)
    const {enqueueSnackbar} = useSnackbar()

    const dispatch = useDispatch()
    const deleteAccount=async()=>{
            try {
                setLoading(true)
                const response = await axios.delete(`https://video-sharing-app-backend-1.onrender.com/user/delete/${user._id}`,{
                    headers:{
                        Authorization:token
                    }
                })
                setLoading(false)
                console.log(response)
                if(response.status==201){
                     enqueueSnackbar('Account Deleted',{variant:'error'})
                     localStorage.removeItem("token");
    dispatch(removeUser())
                     navigate('/home')   
                }               
            } catch (error) {
                console.log(error)
            }
    }

    return (
    <div className='del-acc'>
        {
            loading && <div className="load-container">
                <div className="loading">
                <RotatingLines strokeColor='red'/>
                <h4>Erasing All Data....</h4>
            </div>
            </div>
        }
        <h2>Delete account</h2>
        <p>User Name : {user.name}</p>
        <input type="text" onChange={e =>setConfirmText(e.target.value)} placeholder='please Enter UserName' />
        <div className="actions">
            <button disabled={user.name != confirmText} onClick={deleteAccount}>Delete</button>
            <button onClick={()=> navigate('/profile')} >Cancel</button>
        </div>

    </div>
  )
}

export default DeleteAccount