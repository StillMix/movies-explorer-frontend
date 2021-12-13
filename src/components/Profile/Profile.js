import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import FormValidation from '../FormValidation/FormValidation';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const {
    values, handleChange, errors, isValid,
  } = FormValidation({ name: currentUser.data.name, email: currentUser.data.email });
  function handleOpenEdit() {
    setIsOpenEdit(true);
  }

  const profileValid = isValid
  && (values.name !== currentUser.data.name || values.email !== currentUser.data.email);

  function handleCloseEdit() {
    setIsOpenEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateProfile(values);
    handleCloseEdit();
  }

  return (
   <>
    <div className="profile">
         <p className="profile__title">Привет, {values.name}</p>
        <form onSubmit={handleSubmit}>
         <div className="profile__container">
            <p className="profile__input__name">Имя</p>
            <input className={`profile__input ${isOpenEdit ? 'active' : ''}`} disabled={!isOpenEdit} name="name" minLength="1" maxLength="30" value={values.name} onChange={handleChange} placeholder="Введите имя" required/>
            <span className="form__error">{errors.name}</span>
         </div>
         <div className="profile__container">
            <p className="profile__input__name">E-mail</p>
            <input name="email" value={values.email} onChange={handleChange} type="email" className={`profile__input ${isOpenEdit ? 'active' : ''}`} placeholder="Введите E-mail" id="email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
            <span className="form__error">{errors.email}</span>
         </div>
         {isOpenEdit ? (
                <>
              <button className={`profile__save ${profileValid || props.isFormDisabled ? '' : 'disable'}`} type="submit">Сохранить</button>
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
