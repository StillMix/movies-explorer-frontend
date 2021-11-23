/* eslint-disable react/react-in-jsx-scope */
import './AboutMe.css';
import PhotoMe from '../../images/photoMe.png';

function AboutMe() {
  return (

      <div className="aboutme">
        <div className="aboutme__head">
          <p className="aboutme__head__text">Студент</p>
        </div>
        <div className="aboutme__container">
          <div className="aboutme__container__text">
            <p className="aboutme__name">Виталий</p>
            <p className="aboutme__about">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutme__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
              начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
              как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.</p>
            <div className="aboutme__container__link">
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/still.mix.3" className="aboutme__link">Facebook</a>
              <a target="_blank" rel="noreferrer" href="https://github.com/StillMix?tab=repositories" className="aboutme__link">Github</a>
            </div>
          </div>
          <img src={PhotoMe} className="aboutme__photo" alt="Моё фото" />
        </div>
      </div>

  );
}

export default AboutMe;
