/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import './MoviesCard.css';

import React from 'react';

function MoviesCard(props) {
  const trailerLink = props.card.trailerLink ? props.card.trailerLink : props.card.trailer;
  const durationHours = Math.floor(props.card.duration / 60);
  const durationMinutes = props.card.duration - (durationHours * 60);
  const durationString = durationHours ? `${durationHours}ч ${durationMinutes}м` : `${durationMinutes}мин`;
  const [isSaved, setIsSaved] = React.useState(false);
  React.useEffect(() => {
    const cardId = props.card.id ? props.card.id : props.card.movieId;
    if (props.savedMoviesIds.find((item) => item.movieId === cardId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [props.savedMoviesIds, props.card.id, props.card.movieId]);

  const handleClick = () => {
    window.open(trailerLink);
  };

  const handleSave = () => {
    props.saveMovie({
      country: props.card.country || 'Не указано',
      director: props.card.director || 'Не указано',
      duration: props.card.duration || 0,
      year: props.card.year || 'Не указано',
      description: props.card.description || 'Не указано',
      image: `https://api.nomoreparties.co${props.card.image.url}`,
      trailer: (trailerLink && trailerLink.startsWith('http')) ? trailerLink : 'https://youtube.com',
      thumbnail: props.card.thumbnail || 'https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png',
      nameRU: props.card.nameRU || 'Не указано',
      nameEN: props.card.nameEN || 'Не указано',
      movieId: props.card.id,
    });
  };

  const handleRemove = () => {
    props.removeMovie(props.card.id ? props.card.id : props.card.movieId);
  };

  const handleCard = () => {
    if (isSaved) {
      handleRemove();
      setIsSaved(false);
    } else {
      handleSave();
    }
  };

  return (<
        li className="card" >
        <
            img src={`${props.card.image.url ? `https://api.nomoreparties.co${props.card.image.url}` : `${props.card.image}`}`} alt="Фильм" className="card__img" onClick={handleClick} />
        <div className="card__container">
            <p className="card__title">{props.card.nameRU}</p>
            <button className={`card__like ${isSaved ? 'like' : 'dislike'}`} onClick={handleCard}></button>
        </div>
        <p className="card__time">{durationString}</p>
    </li>
  );
}

export default MoviesCard;
