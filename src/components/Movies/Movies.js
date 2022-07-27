import { useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({moviesArray}) => {

    const [checked, setChecked] = useState({
        name: true,
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
        <SearchForm />
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
        <hr className="movies__line"/>
        {moviesArray.length !== 0 ? 
        <MoviesCardList moviesArray={moviesArray}/> :
        <Preloader />
        }
        <button className="movies__more-button">Ещё</button>
      </div>
    )
}

export default Movies;