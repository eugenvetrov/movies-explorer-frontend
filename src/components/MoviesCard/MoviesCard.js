import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({nameRU, imageUrl, trailerLink, duration}) => {

    const [isLiked, setIsLiked] = useState(false)

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }

    return(
        <div className="movie-card">
            <a href={trailerLink} className="movie-card__link">
            <p className="movie-card__title">{nameRU}</p>
            <p className="movie-card__duration">{duration} минут</p>
            <img src={imageUrl} className="movie-card__image" alt="Обложка фильма"/>
            </a>
            <button className={`movie-card__like ${isLiked ? 'movie-card__like_active' : ''}`} type="button" onClick={handleLikeClick}>{isLiked ? '' : 'Сохранить'}</button>
        </div>
    )
}

export default MoviesCard