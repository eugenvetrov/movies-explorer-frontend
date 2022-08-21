import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import useWindowWidth from "../../customHooks/useWindowWidth"
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {MOVIES_COUNT_ADD_LARGE, MOVIES_COUNT_ADD_MEDIUM, MOVIES_COUNT_ADD_SMALL} from '../../utils/Constants'

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, setIsLoading, saveAndUnsaveMovie, savedMovies, mainSearchFormValue, moreMoviesButtonVisible, moreShortMoviesButtonVisible, setMoreMoviesButtonVisible, setMoreShortMoviesButtonVisible}) => {

  const moviesCountAddLarge = MOVIES_COUNT_ADD_LARGE;
  const moviesCountAddMedium = MOVIES_COUNT_ADD_MEDIUM;
  const moviesCountAddSmall = MOVIES_COUNT_ADD_SMALL;

  const location = useLocation();
  const [isSearched, setIsSearched] = useState();

  const getLocalSwitcherValue = () => {
    const shortSwitcher = localStorage.getItem("longFilm");
    const parsedShortSwitcher = JSON.parse(shortSwitcher);
    if(parsedShortSwitcher !== null) {
      return parsedShortSwitcher
    } else {
      return true;
    }
  }

  const getLocalStorageState = () => {
    const mainVisible = localStorage.getItem("moreMoviesButtonVisible");
    const parsedMainVisible = JSON.parse(mainVisible);
    const shortVisible = localStorage.getItem("moreShortMoviesButtonVisible");
    const parsedShortVisible = JSON.parse(shortVisible);
    const count = localStorage.getItem("cardCount");
    const parsedCount = JSON.parse(count);
    const shortCount = localStorage.getItem("cardShortCount");
    const parsedShortCount = JSON.parse(shortCount);
    parsedMainVisible && setMoreMoviesButtonVisible(parsedMainVisible);
    parsedShortVisible && setMoreShortMoviesButtonVisible(parsedShortVisible);
    parsedCount && setCardCount(parsedCount);
    parsedShortCount && setCardShortCount(parsedShortCount);
    getLocalSwitcherValue()
  }

  useEffect(() => {
    getLocalStorageState()
    moviesArray.length > 0 && checked.longFilm && cardCount < moviesArray.length - 1 && setMoreMoviesButtonVisible(true)
    shortMoviesArray.length > 0 && !checked.longFilm && cardShortCount < shortMoviesArray.length - 1 && setMoreShortMoviesButtonVisible(true)
    moviesArray.length > 0 && checked.longFilm && cardCount >= moviesArray.length - 1 && setMoreMoviesButtonVisible(false)
    shortMoviesArray.length > 0 && !checked.longFilm && cardShortCount >= shortMoviesArray.length - 1 && setMoreShortMoviesButtonVisible(false)
    moviesArray.length === 0 && setMoreMoviesButtonVisible(false);
    shortMoviesArray.length === 0 && setMoreShortMoviesButtonVisible(false);
  }, [location]); /*eslint-disable-line */

  useEffect(() =>{
    if (isSearched) {
      setIsSearched(false);
      setCardCount(getInitialCountOfMovies(windowWidth));
      setCardShortCount(getInitialCountOfMovies(windowWidth));
    }
  }, [mainSearchFormValue]); /*eslint-disable-line*/

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

  const [checked, setChecked] = useState({longFilm: getLocalSwitcherValue()});

  const handleChange = (event) => {
    const { name } = event.target;
    setChecked((prev) => ({
      ...prev,
      [name]: !checked[name],
    }));
    localStorage.setItem("longFilm", !checked.longFilm)
  };

  const handleMoreCards = (event) => {
    event.preventDefault();
    if(windowWidth >= 1280) {
      if(checked.longFilm) {  
        localStorage.setItem("cardCount", cardCount + moviesCountAddLarge);
        setCardCount(cardCount + moviesCountAddLarge)
       } else if (!checked.longFilm) { 
        localStorage.setItem("cardShortCount", cardShortCount + moviesCountAddLarge);
        setCardShortCount(cardShortCount + moviesCountAddLarge)
       } 
    } else if (windowWidth > 480) {
      if (checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + moviesCountAddMedium);
        setCardCount(cardCount + moviesCountAddMedium)
      } else if (!checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + moviesCountAddMedium);
        setCardShortCount(cardShortCount + moviesCountAddMedium)
      }
    } else if (windowWidth <= 480) {
      if(checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + moviesCountAddSmall);
        setCardCount(cardCount + moviesCountAddSmall)
      } else if (!checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + moviesCountAddSmall);
        setCardShortCount(cardShortCount + moviesCountAddSmall)
      }
    }
    if (cardCount >= moviesArray.length - 1) {
      setMoreMoviesButtonVisible(false);
      localStorage.setItem("moreMoviesButtonVisible", false);
    } else if (cardShortCount >= shortMoviesArray.length - 1) {
      setMoreShortMoviesButtonVisible(false);
      localStorage.setItem("moreShortMoviesButtonVisible", false);
    }
  }

    return (
      <div className="movies">
        <SearchForm onSubmit={onSubmit} mainSearchFormValue={mainSearchFormValue} setIsSearched={setIsSearched} setIsLoading={setIsLoading}/>
        <FilterCheckbox 
           title="Короткометражки"
           name="longFilm"
           handleChange={handleChange}
           checked={checked}
        />
        <hr className="movies__line"/>
        {moviesArray.length !== 0 && localStorage.getItem("mainSearchFormValue") && 
        <MoviesCardList moviesArray={moviesArray} shortMoviesArray={shortMoviesArray} isShort={!checked.longFilm} saveAndUnsaveMovie={saveAndUnsaveMovie} cardCount={cardCount} cardShortCount={cardShortCount} savedMovies={savedMovies} />
        }
        {
          moviesArray.length === 0 && localStorage.getItem("mainSearchFormValue") && isLoading &&  <Preloader isLoading={isLoading} moreMoviesButtonVisible={moreMoviesButtonVisible} />
        }
        {
           moviesArray.length === 0 && localStorage.getItem("mainSearchFormValue") && !isLoading && <p>Ничего не найдено</p>
        }
        
        {checked.longFilm ? 
        <button className={`movies__more-button ${moreMoviesButtonVisible ? "" : "movies__more-button_deactivated"}`} onClick={handleMoreCards}>Ещё</button> :
        <button className={`movies__more-button ${moreShortMoviesButtonVisible ? "" : "movies__more-button_deactivated"}`} onClick={handleMoreCards}>Ещё</button>
        }
      </div>
    )
}

export default Movies;