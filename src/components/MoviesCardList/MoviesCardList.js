import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({moviesArray, shortMoviesArray, isShort, saveAndUnsaveMovie, cardCount, cardShortCount, moreButtonVisible}) => {

    return (
        <section className="movies-list">
           {isShort ? 
           shortMoviesArray.slice(0, cardShortCount).map((card) => {
            return (
            <MoviesCard
               key={card.id}
               movie={card}
               nameRU={card.nameRU}
               imageUrl={`https://api.nomoreparties.co/${card.image.url}`}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={saveAndUnsaveMovie}
               />
            )}
            )  :
           moviesArray.slice(0, cardCount).map((card) => {
            return (
            <MoviesCard
               key={card.id}
               movie={card}
               nameRU={card.nameRU}
               imageUrl={`https://api.nomoreparties.co/${card.image.url}`}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={saveAndUnsaveMovie}
               />
            )}
            )}
        </section>
    )
}

export default MoviesCardList;