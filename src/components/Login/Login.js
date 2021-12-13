import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/header-logo.svg';
import FormValidation from '../FormValidation/FormValidation';

function Login(props) {
  const {
    values, handleChange, errors, isValid,
  } = FormValidation({ email: '', password: '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSignIn(values);
  };
  return (
    <>  <div className="login">
    <Link to={'/'} className="login__logo"><img alt="логотип" src={Logo} /></Link>
    <p className="login__title">Рады видеть!</p>
    <form onSubmit={handleSubmit} className="loginform">
  <label>
  <p className="loginform__name">E-mail</p>
          <input name="email" value={values.email} onChange={handleChange} type="email" className="registerform__input" placeholder="Введите E-mail" id="email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
          <span className="form__error">{errors.email}</span>
  </label>
  <label>
  <p className="loginform__name">Пароль</p>
          <input name="password" type="password" id='password' minLength={1} maxLength={30} value={values.password} onChange={handleChange} className="loginform__input" placeholder="Введите Пароль" required/>
          <span className="form__error">{errors.password}</span>
  </label>
        <button type="submit" className={`loginform__btn ${isValid || props.isFormDisabled ? '' : 'disable'}`}>Войти</button>
     </form>
     <p className="login__text">Ещё не зарегистрированы?<span> <Link to={'/signup'} className="login__ent">Регистрация</Link></span></p>
     </div>
 </>
  );
}

export default Login;
