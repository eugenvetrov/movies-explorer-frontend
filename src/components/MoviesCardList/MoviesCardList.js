import './MoviesCardList.css';
import moviesArray from '../../utils/moviesArray';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
    return (
        <section className="movies-list">
           {moviesArray.map((card) => {
            return (
            <MoviesCard
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