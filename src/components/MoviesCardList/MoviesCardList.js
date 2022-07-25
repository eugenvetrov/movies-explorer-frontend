import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({moviesArray}) => {
    return (
        <section className="movies-list">
           {moviesArray.map((card) => {
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