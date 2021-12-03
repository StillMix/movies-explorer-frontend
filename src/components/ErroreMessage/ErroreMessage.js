/* eslint-disable linebreak-style */
import React from 'react';

import IMG from '../../images/errore-image.svg';
import './ErroreMessage.css';

function ErroreMessage(props) {
  const closeerrore = () => {
    props.setIsOpen(false);
  };

  const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeerrore();
    }
  };
  React.useEffect(() => {
    document.addEventListener('keyup', handleEsc);

    return () => {
      document.removeEventListener('keyup', handleEsc);
    };
  });

  return (
      <div className={`errore ${props.isOpen && 'errore_opened'}`}>
          <div className="errore__container">
        <img className="errore__image" src={IMG} alt="Результат запроса" />
              <p className="errore__text">{props.message}</p>
              <button className="errore__close-button" onClick={closeerrore} />
          </div>
      </div>
  );
}

export default ErroreMessage;
