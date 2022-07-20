import './App.css';
import { Routes, Route} from "react-router-dom";
import {useState} from "react"
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';

const App = () => {

  const [activeAuthLink, setActiveAuthLink] = useState('signin')
  const [activeMoviesLink, setActiveMoviesLink] = useState('movies')

  const handleAuthMouthOver = (button) => {
    setActiveAuthLink(button);
  }

 
  const handleActiveMoviesLink = (button) => {
    setActiveMoviesLink(button);
  }

  const userName = "Евгений"


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
              <Movies />
             }
          />
          <Route
             path="/saved-movies"
             element={
                <SavedMovies />
             }
          />
          <Route
             path="/profile"
             element={
               <Profile name={userName} />
             }
          />
          <Route
             path="/register"
             element={
               <Register />
             }
          />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
