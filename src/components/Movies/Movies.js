import { useState } from 'react';
import useWindowWidth from "../../customHooks/useWindowWidth"
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, saveAndUnsaveMovie}) => {

  const windowWidth = useWindowWidth();
  const [moreMoviesButtonVisible, setMoreMoviesButtonVisible] = useState(true);
  const [moreShortMoviesButtonVisible, setMoreShortMoviesButtonVisible] = useState(true)

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
    setCardCount(getInitialCountOfMovies(windowWidth));
    setCardShortCount(getInitialCountOfMovies(windowWidth));
    setMoreMoviesButtonVisible(true);
    setMoreShortMoviesButtonVisible(true);
  };

  const handleMoreCards = (event) => {
    event.preventDefault();
    if(windowWidth >= 1280) {
      checked.shortFilm ?  setCardCount(cardCount + 3) : setCardShortCount(cardShortCount + 3)
    } else if (windowWidth > 480) {
      checked.shortFilm ?  setCardCount(cardCount + 2) : setCardShortCount(cardShortCount + 2)
    } else if (windowWidth <= 480){
      checked.shortFilm ?  setCardCount(cardCount + 1) : setCardShortCount(cardShortCount + 1)
    }
    if (cardCount >= moviesArray.length - 1) {
      setMoreMoviesButtonVisible(false);
    } else if (cardCount >= shortMoviesArray.length - 1) {
      setMoreShortMoviesButtonVisible(false);
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
        <Preloader isLoading={isLoading} moreMoviesButtonVisible={moreMoviesButtonVisible} />
        }
        {checked.shortFilm ? 
        <button className={`movies__more-button ${moreMoviesButtonVisible ? "" : "movies__more-button_deactivated"}`} onClick={handleMoreCards}>Ещё</button> :
          <button className={`movies__more-button ${moreShortMoviesButtonVisible ? "" : "movies__more-button_deactivated"}`} onClick={handleMoreCards}>Ещё</button>
        }
        
      </div>
    )
}

export default Movies;