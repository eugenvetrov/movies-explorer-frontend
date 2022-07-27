import './App.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
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
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import { api, auth } from '../../utils/MainApi';

const App = () => {

  const [activeAuthLink, setActiveAuthLink] = useState('signin')
  const [activeMoviesLink, setActiveMoviesLink] = useState('movies')
  const [movies, setMovies] = useState([])
  const [mainSearchResults, setMainSearchResults] = useState([]);
  const [shortMainSearchResults, setShortMainSearchResults] = useState([])

  useEffect(() => {
    moviesApi.getContent().then(movies => setMovies(movies)).catch((err) => {
      console.log(err);
    });
  }, [])
  
  const handleMainSearchResults = (value) => {


    const mainResult = movies.filter((movie) => {
      return (
      Object.values(movie).some((field) => {
        if (typeof(field) === 'string' && typeof(value) === 'string' && field.includes(value)) {
          return true;
        } else {
          return false;
        }
      }))
    }
    )

    const shortResult = mainResult.filter(movie => {
      return movie.duration <= 40;
    })

    setMainSearchResults(mainResult);
    setShortMainSearchResults(shortResult);
    
  }
  


  useEffect(() => {
    handleMainSearchResults("Whateverest")
    console.log(mainSearchResults);
  }, [movies])
  

  const navigate = useNavigate();

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
      <main className="main">
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
             path="/signup"
             element={
               <Register />
             }
          />
          <Route
             path="/signin"
             element={
               <Login />
             }
          />
          <Route
             path="/*"
             element={
               <NotFound />
             }
          />
        </Routes>
        </main>
        <Footer />
    </div>
  );
}

export default App;
