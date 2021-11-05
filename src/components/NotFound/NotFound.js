
import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';


function NotFound() {
    const history = useHistory();

    const handleBack = () => {
      history.goBack();
    };
  return (
   <> 
   <div className="notfound">
   <p className="notfound__title">404</p>
   <p className="notfound__subtitle">Страница не найдена</p>
   <button onClick={handleBack} className="notfound__btn">Назад</button>
   </div>
   </>
  );
}

export default NotFound;