import './ProfileForm.css'
import icon from '../../assets/profile_img.svg'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { useRef } from "react";

const ProfileForm = () => {
  const {user_name, avatar} = useSelector(state => state.auth.profile); 
  const [name,setName] = useState(user_name);
  const [file,setFile] = useState('');
  const fileInputRef = useRef(null);

   const uplaodFile = () => {
        fileInputRef.current.click();
   }
   
   const handleChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }
        setFile(fileObj.name);
        console.log(fileObj);
    };

  return (
    <div className='profile_wrapper'>
         <div className="profile">
              <h3 className='profile_title'>Profile details</h3>
              <form action="patch" className='profile_form'>
                <div className="avatar_wrapper">
                    <img className= 'avatar'src={avatar} alt="" />
                    <input 
                       type="file"
                       style={{ display: "none" }} 
                       ref={fileInputRef}
                       onChange={handleChange}
                    />
                    <p className='file_custom' onClick={uplaodFile} >{file ? file : 'upload profile image'}</p>
                </div>
                <input className = 'input_name' type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className='btn_profile'>Save</button>
              </form>
         </div>
         <div className='profile_icon_wrapper'>
            <img className='profile_icon' src={icon} alt="icon" />
         </div>
    </div>
  )
}

export default ProfileForm