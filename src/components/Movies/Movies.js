import { useState } from 'react';
import useWindowWidth from "../../customHooks/useWindowWidth"
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, saveAndUnsaveMovie}) => {

  const windowWidth = useWindowWidth();

  const getInitialCountOfMovies = (width) => {
    if(width > 1279) {
      return 12;
    } else if (width >= 768) {
      return 8;
    } else if (width < 768) {
      return 5;
    }
  }

  const [cardCount, setCardCount] = useState(getInitialCountOfMovies(windowWidth));
  const [cardShortCount, setCardShortCount] = useState(getInitialCountOfMovies(windowWidth));

  const [checked, setChecked] = useState({
    shortFilm: true,
    });

  const handleChange = (event) => {
    const { name } = event.target;
    setChecked((prev) => ({
      ...prev,
      [name]: !checked[name],
    }));
  };
  const handleMoreCards = (event) => {
    event.preventDefault();
    if(windowWidth >= 1280) {
      checked.shortFilm ? setCardShortCount(cardShortCount + 3) : setCardCount(cardCount + 3);
    } else if (1280 > windowWidth > 480) {
      checked.shortFilm ? setCardShortCount(cardShortCount + 2) : setCardCount(cardCount + 2);
    } else if (windowWidth <= 480){
      checked.shortFilm ? setCardShortCount(cardShortCount + 1) : setCardCount(cardCount + 1);
    }
  }

    return (
      <div className="movies">
        <SearchForm onSubmit={onSubmit}/>
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
        <hr className="movies__line"/>
        {moviesArray.length !== 0 ? 
        <MoviesCardList moviesArray={moviesArray} shortMoviesArray={shortMoviesArray} isShort={!checked.shortFilm} saveAndUnsaveMovie={saveAndUnsaveMovie} cardCount={cardCount} cardShortCount={cardShortCount} /> :
        <Preloader isLoading={isLoading} />
        }
        <button className="movies__more-button" onClick={handleMoreCards}>Ещё</button>
      </div>
    )
}

export default Movies;