
import './MenuPopup.css';

import MenuClose from '../../images/menu-close.svg';
import AccountIcon from '../../images/account-icon.svg';
import { Link } from 'react-router-dom';

function MenuPopup(props) {
  return (
   <> 
     <div className={`${props.isOpen ? 'menu' : 'menu__close'}`}>
     <div className="popup__background"></div>
     <div className="popup">
         <img alt="Закрыть" src={MenuClose} onClick={props.setIsClose} className="menu__btn__close"></img>
         <div className="popup__container">
         <Link to={'/'} className="popup__main" onClick={props.setIsClose}>Главная</Link>
         <Link to={'/movies'} className="popup__film" onClick={props.setIsClose}>Фильмы</Link>
         <Link to={'/saved-movies'} className="popup__savedfilm" onClick={props.setIsClose}>Сохранённые фильмы</Link>
         </div>
         <Link to={'/profile'} className="popup__account" onClick={props.setIsClose}>Аккаунт<span><img alt="Icon from Account"className="header__icon" src={AccountIcon}></img></span></Link>
     </div>
     </div>
   </>
  );
}

export default MenuPopup;
