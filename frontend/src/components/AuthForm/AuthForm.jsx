
import { useState,useEffect } from 'react'
import { emailValidate, passwordValidate, userNameValidate } from '../../utils/authValidate.js'

import './AuthForm.css'
import { actions } from '../../store/slices/authSlice.js'
import { useDispatch,useSelector} from 'react-redux'


const AuthForm = () => {
    const [input, setInput] = useState({user_name:'', email: '', password: ''});
    const [form,setForm] = useState(false);
    const [err,setErr] = useState({user_name:'', email: '', password: ''});
    const dispatch = useDispatch(); 
    const {loading, error} = useSelector(state => state.auth);

    const handler = () => {
        setForm(prev => !prev);
        setErr({user_name:'', email: '', password: ''});
        setInput({user_name:'', email: '', password: ''});
    } 

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setInput(prev => {
          return {
             ...prev,
             [name]: value
          }
        })
    }
    const handlerClick = (e) => {
      setErr(prev =>{
        const { name } = e.target;
        dispatch(actions.clearError());
        return {
             ...prev,
             [name]: '' 
         }
      });
    }
    const handlerSubmit = (e) => {
      e.preventDefault();
      const errors = {};
      if(form && !userNameValidate(input.user_name)) errors.user_name = 'User name is not valid';
      if(!emailValidate(input.email)) errors.email = 'Email is not valid';
      if(!passwordValidate(input.password)) errors.password = 'Password is not valid';

      setErr(errors);
      if(Object.keys(errors).length > 0) return;
      dispatch(actions.authRequest(input));
    }

  return (
    <form className='form' method="post" onSubmit={handlerSubmit}>
        <h3 className='title'>{form ? 'Sign Up' : 'Login'}</h3>
        {form && <input 
                    type="text" 
                    placeholder='Full name'
                    className='input'
                    name='user_name'
                    onChange={handlerInput}
                    onClick={handlerClick}
                    value={input.user_name}
                />
        }
        {err.user_name ? <p className='auth-err'>{err.user_name}</p> : ''}
        <input 
              type="text" 
              placeholder='Email'
              name='email'
              className='input'
              onChange={handlerInput}
              onClick={handlerClick}
              value={input.email}
        />
        {err.email ? <p className='auth-err'>{err.email}</p> : ''}
        <input 
              type="password" 
              placeholder='Password'
              name='password'
              className='input'
              onChange={handlerInput}
              onClick={handlerClick}
              value={input.password}
        />
        {err.password ? <p className='auth-err'>{err.password}</p> : ''}
        <button className={loading ? 'btn-auth loading' : 'btn-auth'}>{form ? 'Create Account' : 'Login Now'}</button>
         {error && <p className='auth-err'>Invalid account or password</p>}
        <div className='wrap_redirect'>
            <p>{form ? 'Already have an account?' : 'Create an account'}</p>
            <span onClick={handler}>Click here</span>
        </div>
    </form>
  )
}

export default AuthForm