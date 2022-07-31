import './SavedMoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMoviesCardList = ({moviesArray, shortMoviesArray, isShort, saveAndUnsaveMovie}) => {
    
    return (
        <section className="movies-list">
           {
           isShort ? 
           shortMoviesArray.map((card) => {
            return (
            <MoviesCard
               key={card.movieId}
               movie={card}
               nameRU={card.nameRU}
               imageUrl={card.image}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={saveAndUnsaveMovie}
               />
            )}
            )  :
           moviesArray.map((card) => {
            return (
            <MoviesCard
               key={card.movieId}
               movie={card}
               nameRU={card.nameRU}
               imageUrl={card.image}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={saveAndUnsaveMovie}
               />
            )}
            )}
        </section>
    )
}

export default SavedMoviesCardList;