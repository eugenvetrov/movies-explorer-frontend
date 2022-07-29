import { useState, useEffect} from 'react';
import useWindowWidth from "../../customHooks/useWindowWidth"
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, saveAndUnsaveMovie}) => {

  const windowWidth = useWindowWidth();

  const [cardCount, setCardCount] = useState(0);
  const [cardShortCount, setCardShortCount] = useState(0);

    useEffect(() => {
      if(windowWidth > 1279) {
        setCardCount(12);
        setCardShortCount(12);
      } else if (1280 > windowWidth > 767) {
        setCardCount(8);
        setCardShortCount(8);
      } else if (windowWidth < 768) {
        setCardCount(5);
        setCardShortCount(5);
      }
    }, [windowWidth])

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
      console.log(cardCount, cardShortCount);
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