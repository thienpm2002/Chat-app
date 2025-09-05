import './ListChat.css';
import { Link } from 'react-router-dom';
import ChatItem from './ChatItem/ChatItem.jsx';
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from 'react';
import InputSearch from './InputSearch/InputSearch.jsx';
import ResultSearch from './ResultSearch.jsx';
import userApi from '../../services/userApi.js';
import api from '../../services/axois.js';
const API_URL = import.meta.env.VITE_API_URL;

const ListChat = ({ handler, handlerSelectUser,socket,click,setClick,messageNotification,setMessageNotification }) => {
  const profile = useSelector(state => state.auth.profile);
  const [listResult, setListResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const users = useSelector(state => state.chat.users);
  const [input,setInput] = useState('');
  const wrapperRef = useRef(null);

  const handlerClick = async (receiver) => {
    const chat = await api.post('/chat',{receiverId: receiver._id});
    socket.emit('join_room', chat._id);
    handlerSelectUser(receiver, chat._id);
    if(click === receiver._id) return;
    setClick(receiver._id);
    setMessageNotification(prev => prev.filter(item => item.receiverId !== receiver._id));
  };

  const onSearch = async (key) => {
    if(!key) return setSearchResults([]);
    const results = await userApi.search(key);
    setSearchResults(results);
  };

  const onSelect = (receiver) => {
    handlerClick(receiver);
    setListResult(false);
    setInput('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(wrapperRef.current && !wrapperRef.current.contains(e.target)) setListResult(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='list_wrapper'>
      <div className="list_header">
        <div className="list_header__icon">
          <div className= 'infor_profile'>
            <img className= 'infor_profile_avatar' src={profile?.avatar.startsWith('/uploads') ? `${API_URL}${profile.avatar}` : profile?.avatar} alt="" />
            <p className='infor_profile_name'>{profile?.user_name}</p>
          </div>
          <div className="extension_icon_wrapper">
            <i className="extension_icon fa-solid fa-ellipsis-vertical"></i>
            <div className='extension_wrapper'>
              <Link to='/profile'>Edit Profile</Link>
              <p onClick={(e) => { e.stopPropagation(); handler(); }} className='extension_logout'>Logout</p>
            </div>
          </div>
        </div>
        <div className="list_header__search" ref={wrapperRef}>
          <i className="fa-solid fa-magnifying-glass search_icon"></i>
          <InputSearch onClick={() => setListResult(true)} onSearch={onSearch} input={input} setInput={setInput}/>
          {listResult && <ResultSearch results={searchResults} onSelect={onSelect}/>}
        </div>
      </div>

      <div className="list">
        <ul>
          {users.map((user) => (
            <ChatItem key={user._id} click={click} handlerClick={handlerClick} receiver={user} messageNotification={messageNotification}/>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default ListChat;
