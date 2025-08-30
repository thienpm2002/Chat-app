import {useDispatch} from "react-redux";
import { actions } from "../store/slices/authSlice";
import { useNavigate } from 'react-router-dom';

import ListChat from "../components/ListChat/ListChat";
import Chat from "../components/Chat/Chat";
import InfoChat from "../components/InforChat/InfoChat";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handler = () => {
      dispatch(actions.logout());
      navigate('/login'); 
  }
  return (
    <div className='wapper'>
      <div className="home">
        <ListChat handler={handler}/>
        <Chat />
        <InfoChat handler={handler}/>
      </div>
    </div>
  )
}

export default HomePage