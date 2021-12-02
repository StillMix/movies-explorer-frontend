import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  function handleOpenEdit() {
    setIsOpenEdit(true);
  }

  function handleCloseEdit() {
    setIsOpenEdit(false);
  }
  const [values, setValues] = React.useState({
    name: currentUser.data.name,
    email: currentUser.data.email,
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateProfile(values);
    handleCloseEdit();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value,
    });
  }
  return (
   <>
    <div className="profile">
         <p className="profile__title">Привет, {values.name}</p>
        <form onSubmit={handleSubmit}>
         <div className="profile__container">
            <p className="profile__input__name">Имя</p>
            <input className={`profile__input ${isOpenEdit ? 'active' : ''}`} disabled={!isOpenEdit} name="name" minLength="1" maxLength="30" value={values.name} onChange={handleChange} placeholder="Введите имя" required/>
         </div>
         <div className="profile__container">
            <p className="profile__input__name">E-mail</p>
            <input className={`profile__input ${isOpenEdit ? 'active' : ''}`} disabled={!isOpenEdit} name="email" minLength="1" maxLength="30" value={values.email} onChange={handleChange} placeholder="Введите E-mail" required/>
         </div>
         {isOpenEdit ? (
                <>
              <button className="profile__save" type="submit">Сохранить</button>
                </>
         ) : (
          <div className="profile__btns">
          <button className="profile__edit" onClick={handleOpenEdit}>Редактировать</button>
       </div>
         )}
        </form>
        <button className={`profile__exit ${props.isFormDisabled ? 'disable' : ''}`} onClick={props.onSignOut}>Выйти из аккаунта</button>
    </div>
   </>
  );
}

export default Profile;
