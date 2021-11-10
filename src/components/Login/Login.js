
import './Login.css';
import React from 'react';
import Logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
    const [values, setValues] = React.useState({
        email: '',
        password: ''
      });

      const handleChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setValues({
          ...values,
          [name]: value
        });

      }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSignIn(values);
        console.log(values);
        setValues({
            email: '',
            password: ''
        })
      };
  return (
    <>  <div className="login">
    <Link to={'/'} className="login__logo"><img alt="логотип" src={Logo} /></Link>
    <p className="login__title">Рады видеть!</p>
    <form onSubmit={handleSubmit} className="loginform">
  <label>
  <p className="loginform__name">E-mail</p>
  <input name="email" minLength="1" maxLength="30" value={values.email} onChange={handleChange} className="loginform__input" placeholder="Введите E-mail" required/>
  </label>
  <label>
  <p className="loginform__name">Пароль</p>
  <input name="password" type="password" minLength="1" maxLength="30" value={values.password} onChange={handleChange} className="loginform__input" placeholder="Введите Пароль" required/>
  </label>
  <button type="submit" className="loginform__btn">Войти</button>
     </form>
     <p className="login__text">Ещё не зарегистрированы?<span> <Link to={'/signup'} className="login__ent">Регистрация</Link></span></p>
     </div>
 </>
  );
}

export default Login;
