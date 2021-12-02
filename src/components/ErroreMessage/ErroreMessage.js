/* eslint-disable linebreak-style */
import React from 'react';

import IMG from '../../images/errore-image.svg';
import './ErroreMessage.css';

function ErroreMessage(props) {
  const closePopup = () => {
    props.setIsOpen(false);
  };

  const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };
  React.useEffect(() => {
    document.addEventListener('keyup', handleEsc);

    return () => {
      document.removeEventListener('keyup', handleEsc);
    };
  });

  return (
      <div className={`popup ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__container">
        <img className="popup__image" src={IMG} alt="Результат запроса" />
              <p className="popup__text">{props.message}</p>
              <button className="popup__close-button" onClick={closePopup} />
          </div>
      </div>
  );
}

export default ErroreMessage;
