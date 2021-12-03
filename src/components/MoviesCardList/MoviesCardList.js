import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const [renderedMovies, setRenderedMovies] = React.useState(0);
  const [moviesRenderMore, setMoviesRenderMore] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const location = window.location.pathname;

  let resizeTimeout = null;

  const updateWindowWidth = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => setWindowWidth(window.innerWidth), 1500);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  React.useEffect(() => {
    if (location === '/movies') {
      if (windowWidth <= 480) {
        setRenderedMovies(5);
        setMoviesRenderMore(2);
      } else if (windowWidth <= 768) {
        setRenderedMovies(8);
        setMoviesRenderMore(2);
      } else {
        setRenderedMovies(12);
        setMoviesRenderMore(3);
      }
    } else {
      setRenderedMovies(props.cards.length);
    }
  }, [windowWidth, location, props.cards.length]);

  const handleMore = () => {
    setRenderedMovies(renderedMovies + moviesRenderMore);
  };

  return (
        <>
      <ul className={`${!props.cards.length === 0 ? 'cards' : 'cards__error'}`}>
        {props.cards.length === 0 ? (<p className="cards_error_text">Ничего не найдено</p>)
          : props.cards.reduce((moviesToRender, movie) => {
            if (moviesToRender.length < renderedMovies) {
              if (movie.id) {
                moviesToRender.push(
                            <MoviesCard
                                key={movie.id}
                                saveMovie={props.saveMovie}
                                removeMovie={props.removeMovie}
                                savedMoviesIds={props.savedMoviesIds}
                                card={{ ...movie }}
                            />,
                );
              }
              if (movie.movieId) {
                moviesToRender.push(
                        <MoviesCard
                          key={movie.movieId}
                          saveMovie={props.saveMovie}
                          removeMovie={props.removeMovie}
                          savedMoviesIds={props.savedMoviesIds}
                          card={{ ...movie }}
                        />,
                );
              }
            }
            return moviesToRender;
          }, [])
                }
            </ul>
            {props.cards.length > renderedMovies && (
                <div className="movies">
                    <button className="movies__btn" onClick={handleMore}>

                        Ещё
                    </button>
                </div>
            )}
        </>
  );
}

export default MoviesCardList;
