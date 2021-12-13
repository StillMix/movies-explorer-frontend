/* eslint-disable react/react-in-jsx-scope */
import './Portfolio.css';

import ImgLink from '../../images/portfolio-link.svg';

function Portfolio() {
  const linkCard = [
    {
      name: 'Статичный сайт',
      img: ImgLink,
      link: 'https://github.com/StillMix/how-to-learn',
      id: 1,
    },
    {
      name: 'Адаптивный сайт',
      img: ImgLink,
      link: 'https://github.com/StillMix/russian-travel',
      id: 2,
    },
    {
      name: 'Одностраничное приложение',
      img: ImgLink,
      link: 'https://github.com/StillMix/react-mesto-api-full',
      id: 3,
    },
  ];

  return (
   <>
    <div className="portfolio">
           <p className="portfolio__name">Портфолио</p>
           <div className="portfolio__container">
              {
                  linkCard.map((i) => <a key={i.id} href={i.link} target="_blank" rel="noreferrer" className="portfolio__link" >{i.name}<span><img className="portfolio__img" src={i.img} alt="Ссылки"></img></span></a>)
              }

           </div>
    </div>
   </>
  );
}

export default Portfolio;
