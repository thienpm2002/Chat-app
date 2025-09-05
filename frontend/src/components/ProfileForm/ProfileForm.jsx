import './ProfileForm.css'
import icon from '../../assets/profile_img.svg'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useRef } from "react";
import { actions } from '../../store/slices/authSlice';
import api from '../../services/axois';
const API_URL = import.meta.env.VITE_API_URL;

const ProfileForm = () => {
  const {user_name, avatar} = useSelector(state => state.auth.profile); 
  const [name,setName] = useState(user_name);
  const [file,setFile] = useState('');
  const [error,setError] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const uplaodFile = () => {
        fileInputRef.current.click();
        setError('');
   }
   
   const handleChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }
        setFile(fileObj);
    };

   const handlerSubmit = async (e) => {
        e.preventDefault();
        if(file && !file.type.startsWith('image')){
          setError('Invalid file type. Only image files are allowed.');
          return;
        }
        if(!name){
          setError('Name is required');
          return;
        };
        const formData = new FormData();
        if(file){
            formData.append("avatar", file);
        }
        if(name){
            formData.append("user_name", name);
        }
        const res = await api.patch(`/user/me`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        setFile('');
        alert('Profile updated successfully');
        dispatch(actions.authUpdate({name: res.user_name, avatar: res.avatar}));
        navigate('/home');
    }

  return (
    <div className='profile_wrapper'>
         <div className="profile">
              <h3 className='profile_title'>Profile details</h3>
              <form action="patch" className='profile_form' onSubmit={handlerSubmit}>
                <div className="avatar_wrapper">
                    <img className= 'avatar' src={avatar?.startsWith('/uploads') ? `${API_URL}${avatar}` : avatar} alt="" />
                    <input 
                       type="file"
                       style={{ display: "none" }} 
                       ref={fileInputRef}
                       onChange={handleChange}
                    />
                    <p className='file_custom' onClick={uplaodFile} >{file ? file.name : 'upload profile image'}</p>
                </div>
                <input className = 'input_name' type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setError('')}
                />
                {error && <p className='error_form_profile'>{error}</p>}
                <button className='btn_profile'>Save</button>
              </form>
         </div>
         <div className='profile_icon_wrapper'>
            <div className="profile_icon_conatiner">
              <img className='profile_icon' src={icon} alt="icon" />
            </div>
            <button className="retrun_home" onClick={() => navigate('/home')}>Home</button> 
         </div>
    </div>
  )
}

export default ProfileForm