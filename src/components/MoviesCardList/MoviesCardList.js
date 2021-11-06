
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
   <> 
    <ul className="cards">
    {props.cards.map((card) => {
    return(
    <MoviesCard key={card.id} card={ {...card} }/>
    )
    })}
    </ul>
   </>
  );
}

export default MoviesCardList;