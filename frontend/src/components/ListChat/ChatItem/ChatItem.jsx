import React from 'react'
import './ChatItem.css'
import { useSelector } from 'react-redux'
const API_URL = import.meta.env.VITE_API_URL;

const ChatItem = ({ receiver, click, handlerClick,notifications }) => {
  const profile = useSelector(state => state.auth.profile);
  const socketConnected = useSelector((state) => state.socket.isConnected)
  const onlineUsers = useSelector((state) => state.status.onlineUsers)
  const messageNotification = useSelector(state => state.status.messageNotification);
  const checkNotification = notifications?.some(item => item.senderId === receiver._id && item.receiverId === profile?.id);
  const status =
    socketConnected &&
    onlineUsers?.[receiver._id] &&
    onlineUsers[receiver._id].length !== 0

  if (!socketConnected) {
    return (
      <div className="chat_item_wrapper">
        <div className="chat_item_avatar_loading"></div>
        <div className="chat_item_info_loading">
          <p className="chat_item_name_loading"></p>
          <p className="last_chat_loading"></p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        click === receiver._id ? 'chat_item_wrapper active' : 'chat_item_wrapper'
      }
      onClick={() => handlerClick(receiver)}
    >
      <div className="chat_item_avatar">
        <img
          src={
            receiver.avatar?.startsWith('http')
              ? receiver.avatar
              : `${API_URL}${receiver.avatar}`
          }
          alt="avatar"
          className="item_avatr"
        />
      </div>
      <div className="chat_item_info">
        <p className="chat_item_name">{receiver.user_name}</p>
       {status ? <p className="online_status">Online</p> : <p className="offline_status">Offline</p>} 
       {(checkNotification && <i className="fa-solid fa-exclamation message_notification"></i>) || (messageNotification.some(item => item.receiverId === receiver._id) && <i className="fa-solid fa-exclamation message_notification"></i>)}
      </div>
    </div>
  )
}

export default ChatItem
