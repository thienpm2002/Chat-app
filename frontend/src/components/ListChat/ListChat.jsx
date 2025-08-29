
import './ListChat.css'
import { Link } from 'react-router-dom';
import icon from '../../assets/app_icon.png';

const ListChat = ({handler}) => {
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
        <div className="list"></div>
    </div>
  )
}

export default ListChat