import {useDispatch,useSelector} from "react-redux";
import { actions } from "../store/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ListChat from "../components/ListChat/ListChat";
import Chat from "../components/Chat/Chat";
import InfoChat from "../components/InforChat/InfoChat";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(state => state.auth.profile);
  const handler = () => {
    dispatch(actions.logoutRequest());
  }
  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, [profile, navigate]);
  
  return (
    <div className='wapper'>
      <div className="home">
        <ListChat handler={handler}/>
        <Chat />
        <InfoChat />
      </div>
    </div>
  )
}

export default HomePage