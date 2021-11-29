import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/header-logo.svg';
import FormValidation from '../FormValidation/FormValidation';

function Register(props) {
  const {
    values, handleChange, errors, isValid,
  } = FormValidation({ name: '', email: '', password: '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSignUp(values);
  };

  return (
   <>  <div className="register">
      <Link to={'/'} className="register__logo"><img alt="логотип" src={Logo} /></Link>
      <p className="register__title">Добро пожаловать!</p>
      <form onSubmit={handleSubmit} className="registerform">
    <label >
    <p className="registerform__name">Имя</p>
          <input name="name" id='name' minLength={2} maxLength={30} value={values.name} onChange={handleChange} className="registerform__input" placeholder="Введите Имя" required/>
    <span className="form__error">{errors.name}</span>
    </label>
    <label>
    <p className="registerform__name">E-mail</p>
          <input name="email" id='email' minLength={1} maxLength={30} value={values.email} onChange={handleChange} className="registerform__input" placeholder="Введите E-mail" required/>
          <span className="form__error">{errors.email}</span>
    </label>
    <label>
    <p className="registerform__name">Пароль</p>
          <input name="password" type="password" id='password' minLength={1} maxLength={30} value={values.password} onChange={handleChange} className="registerform__input" placeholder="Введите Пароль" required/>
          <span className="form__error">{errors.password}</span>
    </label>
    <button type="submit" className={`registerform__btn ${isValid ? '' : 'disable'}`}>Зарегистрироваться</button>
       </form>
       <p className="register__text">Уже зарегистрированы?<span> <Link to={'/signin'} className="register__ent">Войти</Link></span></p>
       </div>
   </>
  );
}

export default Register;
