import './MoviesCard.css';

function MoviesCard(props) {
    return (
            <li className="card">
               <img src={props.card.Src} alt="Фильм" className="card__img"></img>
               <div className="card__container">
               <p className="card__title">{props.card.title}</p>
               <button className={`card__like ${props.card.isLiked ? 'like' : 'dislike'}`} ></button>
               </div>
               <p className="card__time">{props.card.time}</p>
            </li>
    );
}

export default MoviesCard;