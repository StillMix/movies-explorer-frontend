/* eslint-disable react/react-in-jsx-scope */
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/header-logo.svg';
import AccountIcon from '../../images/account-icon.svg';
import HeaderMenu from '../../images/header-menu-icon.svg';

function Header(props) {
  return (
   <>
   {props.loggedIn ? (
    <>
          <div className="header">
    <Link to={'/'} className="header__logo"><img alt="логотип" src={Logo} /></Link>
    <Link to={'/movies'} className="header__film">Фильмы</Link>
    <Link to={'/saved-movies'} className="header__savedfilm">Сохранённые фильмы</Link>
    <Link to={'/profile'} className="header__account">Аккаунт<span><img alt="Icon from Account"className="header__icon" src={AccountIcon}></img></span></Link>
    <img className={`${props.isOpen ? 'popup__open' : 'header_menu_btn'}`} onClick={props.setIsOpen} alt="menu" src={HeaderMenu}></img>
   </div>
    </>
   ) : (
     <div className="header">
   <img alt="логотип" className="header__logo" src={Logo} />
   <div className="header__container">
      <Link className="header__register" to={'/signup'}>Регистрация</Link>
      <Link className="header__btn" to={'/signin'}>Войти</Link>
    </div>
    </div>
   )
   }
   </>
  );
}

export default Header;
