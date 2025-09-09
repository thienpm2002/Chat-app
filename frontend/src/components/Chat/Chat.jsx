import { useEffect,useState,useRef } from 'react';
import './Chat.css';
import FormSendMessage from './FormSendMessage/FormSendMessage';
import api from '../../services/axois';
import { useSelector } from 'react-redux';
import debugFormData from '../../utils/formData.js'
import { useDispatch } from 'react-redux';
import { onlineActions } from '../../store/slices/onlineSlice';
const API_URL = import.meta.env.VITE_API_URL;

const Chat = ({ receiver, chatId,socket,click, setFiles}) => {
  const [listMessage, setListMessage] = useState([]) // List message trong chat dung de update khi co new message
  const profile = useSelector(state => state.auth.profile);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  useEffect( ()=>{   // Lay list message tu chatId
     if(!socket) return;
     const fetchMessage = async () => {
        try {
          if(!chatId) return setListMessage([]);
          const messages = await api.get(`/message/${chatId}`);
          setListMessage(messages);
        } catch (error) {
          console.log(error);
        }
     }
     fetchMessage();
      const receiverMessage = (newMessage) => {
         if(newMessage.chatId !== chatId) return;
         setListMessage(prev => [...prev,newMessage]);
         setFiles(prev => [...prev, ...(newMessage.attachments || [])]);
      }
       const notificationMessage = (senderId) => {
         if(click !== senderId) {
           dispatch(onlineActions.messageNotification({receiverId: senderId,status: true}));
         }
      }
      socket.on('receive_message', receiverMessage);
      socket.on('message_notification', notificationMessage);
      return () => {
        socket.off('receive_message', receiverMessage);
        socket.off('message_notification', notificationMessage); 
      };
  },[chatId,socket,receiver])
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  const onSend = async (formData) => {   // Ham submit message
    //  debugFormData(formData);
    try {
      const newMessage = await api.post( `/message/${chatId}`,formData,{
        headers: {'Content-Type': 'multipart/form-data'}
      });
      const data = {
        newMessage,
        receiver
      }
      setListMessage(prev => [...prev,newMessage]);
      setFiles(prev => [...prev, ...(newMessage.attachments || [])]);
      socket.emit('send_message', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='chat_wrapper'>
  {receiver && (
    <>
      <div className="chat_header">
        <img className='chat_avatar' src={receiver?.avatar.startsWith('/uploads') ? `${API_URL}${receiver?.avatar}` : receiver?.avatar} alt="" />
        <p className='chat_name'>{receiver?.user_name}</p>
      </div>

      <div className="list_message">
        <ul className='message_list'>
          {(listMessage || []).map(item => {
            const isMine = item.sender?._id === profile?.id;
            const avatarUrl = item.sender?.avatar;

            return (
              <li
                key={item._id}
                className={`message-wrapper ${isMine ? 'send' : 'receive'}`}
              >
                {!isMine && avatarUrl && <img className='message_avatar' src={avatarUrl} alt="" />}
                <div className="message_content">
                  {/* Hiển thị tất cả file nếu có */}
                  {(item.attachments || []).map((att, idx) => (
                    <img
                      key={idx}
                      className="message_file"
                      src={`${API_URL}${att.url}`}
                      alt={`attachment-${idx}`}
                    />
                  ))}

                  {/* Hiển thị text nếu có */}
                  {item.text && <p className='message_text'>{item.text}</p>}
                </div>
              </li>
            );
          })}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      <div className="input_chat">
        <FormSendMessage onSend={onSend} />
      </div>
    </>
  )}
</div>


  );
};

export default Chat;
