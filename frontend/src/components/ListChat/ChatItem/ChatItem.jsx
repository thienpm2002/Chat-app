import React from 'react'
import './ChatItem.css'
import { useSelector } from 'react-redux'

const ChatItem = ({ chatId, author, latestMessage, click, handlerClick }) => {
  const socketConnected = useSelector((state) => state.socket.isConnected)
  const onlineUsers = useSelector((state) => state.status.onlineUsers)

  const status =
    socketConnected &&
    onlineUsers?.[author._id] &&
    onlineUsers[author._id].length !== 0

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
        click === chatId ? 'chat_item_wrapper active' : 'chat_item_wrapper'
      }
      onClick={() => handlerClick(chatId)}
    >
      <div className="chat_item_avatar">
        <img
          src={
            author.avatar?.startsWith('http')
              ? author.avatar
              : `http://localhost:3000${author.avatar}`
          }
          alt="avatar"
          className="item_avatr"
        />
        <div className={status ? 'online' : 'offline'}></div>
      </div>
      <div className="chat_item_info">
        <p className="chat_item_name">{author.user_name}</p>
        <p className="last_chat">
          {latestMessage?.senderId
            ? `${latestMessage.senderId.user_name}: ${latestMessage.text}`
            : latestMessage?.text}
        </p>
      </div>
    </div>
  )
}

export default ChatItem
