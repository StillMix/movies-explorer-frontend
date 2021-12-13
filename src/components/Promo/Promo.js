/* eslint-disable react/react-in-jsx-scope */
import './Promo.css';
import Logo from '../../images/promo-logo.svg';

function Promo() {
  return (
   <>
    <div className="promo">
      <p className="promo__text">Учебный проект студента факультета Веб-разработки.</p>
      <img src={Logo} alt="Логотип" className="promo__logo" />
    </div>
   </>
  );
}

export default Promo;
