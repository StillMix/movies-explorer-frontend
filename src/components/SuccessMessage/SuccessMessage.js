/* eslint-disable linebreak-style */
import React from 'react';

import IMG from '../../images/success-image.svg';
import './SuccessMessage.css';

function SuccessMessage(props) {
  const closeSuccess = () => {
    props.setIsOpen(false);
  };

  const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeSuccess();
    }
  };
  React.useEffect(() => {
    document.addEventListener('keyup', handleEsc);

    return () => {
      document.removeEventListener('keyup', handleEsc);
    };
  });

  return (
        <div className={`success ${props.isOpen && 'success_opened'}`}>
            <div className="success__container">
                <img className="success__image" src={IMG} alt="Результат запроса" />
                <p className="success__text">Профиль успешно обновлен</p>
                <button className="success__close-button" onClick={closeSuccess} />
            </div>
        </div>
  );
}

export default SuccessMessage;
