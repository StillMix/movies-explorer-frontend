import './Register.css';
import React from 'react';
import Logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Register(props) {
    const [values, setValues] = React.useState({
        name: '',
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
        props.onSignUp();
        console.log(values);
        setValues({
            name: '',
            email: '',
            password: ''
        })
      };

  return (
   <>  <div className="register">           
      <Link to={'/'} className="register__logo"><img alt="логотип" src={Logo} /></Link>
      <p className="register__title">Добро пожаловать!</p>
      <form onSubmit={handleSubmit} className="registerform">
    <label >
    <p className="registerform__name">Имя</p>
    <input name="name" minLength="1" maxLength="30" value={values.name} onChange={handleChange} className="registerform__input" placeholder="Введите Имя" required/>
    </label>
    <label>
    <p className="registerform__name">E-mail</p>
    <input name="email" minLength="1" maxLength="30" value={values.email} onChange={handleChange} className="registerform__input" placeholder="Введите E-mail" required/>
    </label>
    <label>
    <p className="registerform__name">Пароль</p>
    <input name="password" type="password" minLength="1" maxLength="30" value={values.password} onChange={handleChange} className="registerform__input" placeholder="Введите Пароль" required/>
    </label>
    <button type="submit" className="registerform__btn">Зарегистрироваться</button>
       </form>
       <p className="register__text">Уже зарегистрированы?<span> <Link to={'/signin'} className="register__ent">Войти</Link></span></p>
       </div>
   </>
  );
}

export default Register;
