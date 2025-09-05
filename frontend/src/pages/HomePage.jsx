import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import ListChat from "../components/ListChat/ListChat";
import Chat from "../components/Chat/Chat";
import InfoChat from "../components/InforChat/InfoChat";
import { getSocket } from "../services/socket";
// import { actionChats } from "../store/slices/chatSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(state => state.auth.profile);

  const [receiver, setReceiver] = useState(null);   // lay thong tin nguoi nhan
  const [chatId, setChatId] = useState(null);    // Lay id cua phong chat
  const [click, setClick] = useState();  // Bien de biet dang click vao user nao de active
   const [messageNotification, setMessageNotification] = useState([]); // Bien de hien thi thong bao tin nhan moi
  const socket = getSocket();

  const handler = () => dispatch(actions.logoutRequest());

  useEffect(() => {
    if (!profile) navigate('/login');  // Khi loout thi xoa het state va quay ve login
  }, [profile, navigate]);


  const handlerSelectUser = (user, id) => {
    setReceiver(user);
    setChatId(id);
  };

  return (
    <div className='wapper'>
      <div className="home">
        <ListChat 
          handler={handler} 
          handlerSelectUser={handlerSelectUser} 
          socket={socket}
          click={click}
          setClick={setClick}
          messageNotification={messageNotification}
          setMessageNotification={setMessageNotification}
        />
        <Chat 
          receiver={receiver} 
          chatId={chatId} 
          socket={socket} 
          click={click} 
          setMessageNotification={setMessageNotification} 
        />
        <InfoChat handler={handler} receiver={receiver} chatId={chatId} />
      </div>
    </div>
  );
};

export default HomePage;
