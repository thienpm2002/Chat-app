import React, { useEffect,useState } from 'react'
import './InfoChat.css'
const API_URL = import.meta.env.VITE_API_URL;
import api from '../../services/axois';

const InfoChat = ({handler,receiver,chatId}) => {
  const [files,setFiles] = useState([]);
  useEffect(()=>{
       if(!chatId) return setFiles([]);
       const getChatFile = async () => {
           try {
               const response = await api.get(`/message/${chatId}/files`);
               setFiles(response);
           } catch (error) {
               console.error(error);
           }
       };
       getChatFile();
  },[chatId])
  if(!receiver){
        return (
      <div className='info_wrapper'>
        <div className='header_infor'></div>
        <div className='media_wrapper'>
          <div className='list_media'>
          </div>
        </div>
        <div className='infor_logout'>
          <button className='btn_logout' onClick={handler}>Logout</button>
        </div>
    </div>
    )
  }
  return (
    <div className='info_wrapper'>
      <div className='header_infor'>
           <img
          src={
            receiver.avatar?.startsWith('http')
              ? receiver.avatar
              : `${API_URL}${receiver.avatar}`
          }
          alt="avatar"
          className="avatar_infor"
        />
          <p className='name_infor'>{receiver.user_name}</p>
      </div>
      <div className='media_wrapper'>
         <p>Media</p>
         <div className='list_media'>
             {files?.length === 0 ? '' : files?.map((file) => (
               <img key={file._id} className='media' src={`${API_URL}${file.url}`} alt="" />
             ))}
         </div>
      </div>
      <div className='infor_logout'>
        <button className='btn_logout' onClick={handler}>Logout</button>
      </div>
    </div>
  )
}

export default InfoChat