import './App.css';
import { Routes, Route} from "react-router-dom";
import {useState} from "react"
import Header from '../Header/Header';
import Promo from '../Promo/Promo.js';
import NavTab from '../NavTab/NavTab.js';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesArray from '../../utils/moviesArray';

function App() {

  const [activeAuthLink, setActiveAuthLink] = useState('signin')
  const [activeMoviesLink, setActiveMoviesLink] = useState('movies')

  const handleAuthMouthOver = (button) => {
    setActiveAuthLink(button);
  }

 
  const handleActiveMoviesLink = (button) => {
    setActiveMoviesLink(button);
  }


  return (
    <div className="page">
      <Header activeAuthLink={activeAuthLink} onAuthMouthOver={handleAuthMouthOver} activeMoviesLink={activeMoviesLink} onActiveMoviesLink={handleActiveMoviesLink}/>
      <Routes>
         <Route
            path="/"
            element={
              <>
              <Promo />
              <NavTab />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
              </>
            }
          />
          <Route
             path="/movies"
             element={
              <>
              <Movies />
              <MoviesCard
               nameRU={moviesArray[0].nameRU}
               imageUrl={`https://api.nomoreparties.co/${moviesArray[0].image.url}`}
               trailerLink={moviesArray[0].trailerLink}
               duration={moviesArray[0].duration}
               />
              </>
             }
          />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
