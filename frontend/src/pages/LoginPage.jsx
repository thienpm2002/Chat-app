import { useNavigate } from 'react-router-dom';
import { useSelector} from "react-redux";
import { useEffect } from 'react';

import AuthForm from '../components/AuthForm/AuthForm.jsx'

const LoginPage = () => {

  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
      if(auth.profile?.user_name){ 
          navigate('/home');
      }
  }, [auth.profile,navigate]);

  return (
    <div className='wapper'>
         <AuthForm />
    </div>
  )
}

export default LoginPage