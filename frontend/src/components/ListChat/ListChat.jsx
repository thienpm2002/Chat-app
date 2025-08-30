import './ListChat.css'
import { Link } from 'react-router-dom';
import icon from '../../assets/app_icon.png';
import ChatItem from './ChatItem/ChatItem.jsx'
import {useSelector} from "react-redux";
import { useState } from 'react'


const ListChat = ({handler}) => {
  const [click,setClick] = useState();  
  const chats = useSelector(state => state.auth.chats);
  const handlerClick = (chatId) => {
        if(click === chatId) return;
        setClick(chatId);
  }
  
  return (
    <div className = 'list_wrapper'>
        <div className="list_header">
            <div className="list_header__icon">
                <img className = 'app_icon' src={icon} alt="icon" />  
                <div className="extension_icon_wrapper">
                    <i className="extension_icon fa-solid fa-ellipsis-vertical"></i>
                    <div className='extension_wrapper'>
                        <Link to='/profile'>Edit Profile</Link>
                        <p onClick={(e) => { e.stopPropagation(); handler(); }} className='extension_logout'>Logout</p>
                    </div>
                </div>
            </div>
            <div className="list_header__search">
                <i className="fa-solid fa-magnifying-glass search_icon"></i>
                <input className = 'input_search' type="text" placeholder='Search user...'/>
            </div>
        </div>
        <div className="list">
            <ul>
                {chats.map((item) => <ChatItem key={item.chatId} author={item.author} latestMessage={item.latestMessage} chatId={item.chatId} click={click} handlerClick={handlerClick}/>)}
            </ul>
        </div>
    </div>
  )
}

export default ListChat