/* eslint-disable react-hooks/exhaustive-deps */

import './Movies.css';

import React from 'react';

import SearchForm from '../SearchForm/SearchForm';

import CardImage from '../../images/image.png';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const [isPreloader, setIsPreloader] = React.useState(false);

  const cardList = [
    {
      id: 1,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: false,
      Short: true,
    },
    {
      id: 2,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: false,
      Short: false,
    },
    {
      id: 3,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: true,
      Short: true,
    },
    {
      id: 4,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: true,
      Short: false,
    },
    {
      id: 5,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: false,
      Short: false,
    },
    {
      id: 6,
      title: '33 слова о дизайне',
      time: '1ч 47м',
      Src: CardImage,
      isLiked: true,
      Short: false,
    },
  ];

  React.useEffect(() => {
    function preloaderTime() {
      setTimeout(() => {
      setIsPreloader(true);
    }, 1500);
  }

    preloaderTime()
    clearTimeout(preloaderTime)
  },[])

  return (
   <> 
   <SearchForm />
   {
     isPreloader ? (         
     <>
      <MoviesCardList cards={cardList}/>
      <div className="movies">
      <button className="movies__btn">Ещё</button>
      </div>
     </> ):
      (
        <Preloader />
      )
   }
   </>
  );
}

export default Movies;