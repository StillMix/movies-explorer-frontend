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
            <p className="aboutme__name">Роман</p>
            <p className="aboutme__about">Фронтенд-разработчик, 17 лет</p>
            <p className="aboutme__text">Я родился и живу в Курске, закончивая 11 класс в школе.
              Я люблю слушать музыку, а ещё увлекаюсь монтажом. Недавно
              начал кодить.После того, как прошёл курс по веб-разработке,
               стал больше оттачивать навыки программирования.</p>
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
