import React from 'react';

import './Profile.css';

function Profile(props) {
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  function handleOpenEdit() {
    setIsOpenEdit(true)
  }

  function handleCloseEdit() {
    setIsOpenEdit(false)
}

  const [values, setValues] = React.useState({
    name: 'Роман',
    email: 'sss@gmail.com'
  });

  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value
    });
   
  }
  return (
   <> 
    <div className="profile">
         <p className="profile__title">Привет, {values.name}</p>
         <div className="profile__container">
            <p className="profile__input__name">Имя</p>
            <input className={`profile__input ${isOpenEdit ? 'active' : ''}`} disabled={isOpenEdit ? false : true} name="name" minLength="1" maxLength="30" value={values.name} onChange={handleChange} placeholder="Введите имя" required/>
         </div>
         <div className="profile__container">
            <p className="profile__input__name">E-mail</p>
            <input className={`profile__input ${isOpenEdit ? 'active' : ''}`} disabled={isOpenEdit ? false : true} name="email" minLength="1" maxLength="30" value={values.email} onChange={handleChange} placeholder="Введите E-mail" required/>
         </div>
         {isOpenEdit ? (
                <>
                <button className="profile__save" onClick={handleCloseEdit}>Сохранить</button>
                </>
         ) : (
          <div className="profile__btns">
          <button className="profile__edit" onClick={handleOpenEdit}>Редактировать</button>
          <button className="profile__exit" onClick={props.onSignOut}>Выйти из аккаунта</button>
       </div>
         )}
    </div>
   </>
  );
}

export default Profile;