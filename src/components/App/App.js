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

function App() {

  const [activeAuthLink, setActiveAuthLink] = useState('signin')
  const [activeMoviesLink, setActiveMoviesLink] = useState('')

  const handleAuthMouthOver = (button) => {
    setActiveAuthLink(button);
  }

 
  const handleActiveMoviesLink = (button) => {
    setActiveMoviesLink(button);
  }


  return (
    <div className="page">
      <Header activeAuthLink={activeAuthLink} onAuthMouthOver={handleAuthMouthOver} activeMoviesLink={activeMoviesLink}/>
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
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
