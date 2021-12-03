/* eslint-disable react-hooks/exhaustive-deps */

import './Movies.css';

import React from 'react';

import SearchForm from '../SearchForm/SearchForm';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const [isPreloader, setIsPreloader] = React.useState(false);
  React.useEffect(() => {
    function preloaderTime() {
      setTimeout(() => {
        setIsPreloader(true);
      }, 1500);
    }
    preloaderTime();
    clearTimeout(preloaderTime);
  }, []);

  return (
    <>
      <SearchForm searchMovies={props.searchMovies}/>
      {
        isPreloader ? (
          <>
            <MoviesCardList
              saveMovie={props.saveMovie}
              removeMovie={props.removeMovie}
              savedMoviesIds={props.savedMoviesIds}
              cards={props.cards}
              movieId={props.movieId}
            />
          </>)
          : (
            <Preloader />
          )
      }
    </>
  );
}

export default Movies;
