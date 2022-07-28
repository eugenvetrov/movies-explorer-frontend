import { useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray, shortMoviesArray, onSubmit, isLoading, saveAndUnsaveMovie}) => {

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
        <MoviesCardList moviesArray={moviesArray} shortMoviesArray={shortMoviesArray} isShort={!checked.shortFilm} saveAndUnsaveMovie={saveAndUnsaveMovie}/> :
        <Preloader isLoading={isLoading} />
        }
        <button className="movies__more-button">Ещё</button>
      </div>
    )
}

export default Movies;