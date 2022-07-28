import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({moviesArray, shortMoviesArray, isShort}) => {
    return (
        <section className="movies-list">
           {isShort ? 
           shortMoviesArray.map((card) => {
            return (
            <MoviesCard
               key={card.id}
               card={card}
               nameRU={card.nameRU}
               imageUrl={`https://api.nomoreparties.co/${card.image.url}`}
               trailerLink={card.trailerLink}
               duration={card.duration}
               />
            )}
            )  :
           moviesArray.map((card) => {
            return (
            <MoviesCard
               key={card.id}
               card={card}
               nameRU={card.nameRU}
               imageUrl={`https://api.nomoreparties.co/${card.image.url}`}
               trailerLink={card.trailerLink}
               duration={card.duration}
               />
            )}
            )}
        </section>
    )
}

export default MoviesCardList;