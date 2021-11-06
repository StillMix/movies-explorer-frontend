
import './Footer.css';

function Footer() {
   const linkCard = 
    [
    {
    name: 'Яндекс.Практикум',
    link: 'https://practicum.yandex.ru/web/',
    id: 1,
    },
    {
    name: 'Github',
    link: 'https://github.com/StillMix?tab=repositories',
    id: 2,
    },
    {
    name: 'Facebook',
    link: 'https://www.facebook.com/still.mix.3',
    id: 3,
    },
    ]

  return (
   <> 
    <div className="footer">
        <p className="footer__project__name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    </div>
    <div className="footer__container">
    <p className="footer__copyright">©2020</p>
    <div className="footer__container__link">
      {
          linkCard.map((i) => {
              return <a target="_blank" rel="noreferrer" key={i.id} href={i.link} className="footer__link">{i.name}</a>
          })
      }
    </div>
    </div>
   </>
  );
}

export default Footer;