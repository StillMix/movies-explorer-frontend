import './SavedMovies.css';

import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList'; 

import SearchForm from '../SearchForm/SearchForm';

import CardImage from '../../images/image.png';

import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const [isPreloader, setIsPreloader] = React.useState(false);

    const cardList = [
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
     </> ):
      (
        <Preloader />
      )
   }
        </>
    );
}

export default SavedMovies;