import './ListChat.css'
import { Link } from 'react-router-dom';
import icon from '../../assets/app_icon.png';
import ChatItem from './ChatItem/ChatItem.jsx'
import {useSelector} from "react-redux";
import { useState } from 'react'


const ListChat = ({handler}) => {
  const [click,setClick] = useState();  
  const chats = useSelector(state => state.auth.chats);
  const id = useSelector(state => state.auth.profile.id);
  const result = chats.map(chat=> {
    const author = chat.members.find(user => user._id !== id);  // Lay ra user con lai chat 1-1 hien tai
    if(!chat.latestMessage){
        return {
            chatId: chat._id,
            author,
            latestMessage: {text:'No messages yet'},
        }
    }
    if(!chat.latestMessage.text && chat.latestMessage.attachments && chat.latestMessage.attachments.length !== 0){
        return {
            chatId: chat._id,
            author,
            latestMessage: {...chat.latestMessage,text:'Sent file'},
        }
    }
    return {
        chatId: chat._id,
        author,
        latestMessage: chat.latestMessage,
    }
  })
  
  const handlerClick = (chatId) => {
        if(click === chatId) return;
        setClick(chatId);
  }
  return (
    <div className = 'list_wrapper'>
        <div className="list_header">
            <div className="list_header__icon">
                <img className = 'app_icon' src={icon} alt="icon" />  
                <i className="extension_icon fa-solid fa-ellipsis-vertical">
                    <div className='extension_wrapper'>
                        <Link to='/profile'>Edit Profile</Link>
                        <p onClick={handler} className='extension_logout'>Logout</p>
                   </div>
                </i>
            </div>
            <div className="list_header__search">
                <i className="fa-solid fa-magnifying-glass search_icon"></i>
                <input className = 'input_search' type="text" placeholder='Search user...'/>
            </div>
        </div>
        <div className="list">
            <ul>
                {result.map((item) => <ChatItem key={item.chatId} author={item.author} latestMessage={item.latestMessage} chatId={item.chatId} click={click} handlerClick={handlerClick}/>)}
            </ul>
        </div>
    </div>
  )
}

export default ListChat