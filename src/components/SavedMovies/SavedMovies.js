import './SavedMovies.css';

import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import SearchForm from '../SearchForm/SearchForm';

import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const word = JSON.parse(localStorage.getItem('searchedSavedMoviesWord'));
  const checkbox = JSON.parse(localStorage.getItem('searchedSavedMoviesCheckBox'));
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
        < SearchForm checkbox={checkbox} word={word} searchMovies={props.searchMovies}/> {
            isPreloader ? (
                <MoviesCardList
                 cards={props.movies}
                saveMovie={props.saveMovie}
                removeMovie={props.removeMovie}
                savedMoviesIds={props.savedMoviesIds} />
            ) : (
            <Preloader/>
            )
        } </>
  );
}

export default SavedMovies;
