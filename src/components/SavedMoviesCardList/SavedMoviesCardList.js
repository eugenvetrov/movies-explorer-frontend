import './SavedMoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMoviesCardList = ({moviesArray, shortMoviesArray, isShort, deleteMovie}) => {
    return (
        <section className="movies-list">
           {
           isShort ? 
           shortMoviesArray.map((card) => {
            console.log(card);
            return (
            <MoviesCard
               key={card.id}
               movie={card}
               nameRU={card.nameRU}
               imageUrl={card.image}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={deleteMovie}
               />
            )}
            )  :
           moviesArray.map((card) => {
            return (
            <MoviesCard
               key={card.id}
               card={card}
               nameRU={card.nameRU}
               imageUrl={card.image}
               trailerLink={card.trailerLink}
               duration={card.duration}
               saveAndUnsaveMovie={deleteMovie}
               />
            )}
            )}
        </section>
    )
}

export default SavedMoviesCardList;