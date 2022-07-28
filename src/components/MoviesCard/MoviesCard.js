import './MoviesCard.css';
import { useState } from 'react';
import usePathname from '../../customHooks/usePathname';

const MoviesCard = ({movie, nameRU, imageUrl, trailerLink, duration, saveAndUnsaveMovie}) => {

    const [isLiked, setIsLiked] = useState(false)

    const pathName = usePathname();

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        saveAndUnsaveMovie(movie)
    }

    let button;

    if(pathName === '/movies'){button =
        <button className={`movie-card__like ${isLiked ? 'movie-card__like_active' : ''}`} type="button" onClick={handleLikeClick}>{isLiked ? '' : 'Сохранить'}</button> } else if (pathName === '/saved-movies'){
        button = <button className="movie-card__like movie-card__like_saved" type="button" onClick={handleLikeClick}></button>
        }

    return(
        <article className="movie-card">
            <a href={trailerLink} className="movie-card__link">
            <p className="movie-card__title">{nameRU}</p>
            <p className="movie-card__duration">{duration} минут</p>
            <img src={imageUrl} className="movie-card__image" alt="Обложка фильма"/>
            </a>
            { button }
        </article>
    )
}

export default MoviesCard