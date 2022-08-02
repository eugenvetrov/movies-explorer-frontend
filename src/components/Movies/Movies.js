import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import useWindowWidth from "../../customHooks/useWindowWidth"
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, setIsLoading, saveAndUnsaveMovie, savedMovies, mainSearchFormValue, moreMoviesButtonVisible, moreShortMoviesButtonVisible, setMoreMoviesButtonVisible, setMoreShortMoviesButtonVisible}) => {

  const location = useLocation();
  const [isSearched, setIsSearched] = useState();

  useEffect(() => {
    const mainVisible = localStorage.getItem("moreMoviesButtonVisible");
    const parsedMainVisible = JSON.parse(mainVisible);
    const shortVisible = localStorage.getItem("moreShortMoviesButtonVisible");
    const parsedShortVisible = JSON.parse(shortVisible);
    const count = localStorage.getItem("cardCount");
    const parsedCount = JSON.parse(count);
    const shortCount = localStorage.getItem("cardShortCount")
    const parsedShortCount = JSON.parse(shortCount);
    parsedMainVisible && setMoreMoviesButtonVisible(parsedMainVisible);
    parsedShortVisible && setMoreShortMoviesButtonVisible(parsedShortVisible);
    parsedCount && setCardCount(parsedCount);
    parsedShortCount && setCardShortCount(parsedShortCount);
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

  const [checked, setChecked] = useState({
    longFilm: true,
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
      if(checked.longFilm) {  
        localStorage.setItem("cardCount", cardCount + 3);
        setCardCount(cardCount + 3)
       } else if (!checked.longFilm) { 
        localStorage.setItem("cardShortCount", cardShortCount + 3);
        setCardShortCount(cardShortCount + 3)
       } 
    } else if (windowWidth > 480) {
      if (checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + 2);
        setCardCount(cardCount + 2)
      } else if (!checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + 2);
        setCardShortCount(cardShortCount + 2)
      }
    } else if (windowWidth <= 480) {
      if(checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + 1);
        setCardCount(cardCount + 1)
      } else if (!checked.longFilm) {
        localStorage.setItem("cardCount", cardCount + 1);
        setCardShortCount(cardShortCount + 1)
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