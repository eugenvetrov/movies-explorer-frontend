import './Footer.css';
import { Routes, Route} from "react-router-dom";

const Footer = () => {
    
    const mainFooter = <footer className="footer">
    <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <hr className="footer__line"/>
    <p className="footer__year">&copy;2020</p>
    <div className="footer__links">
      <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
      <a href="https://github.com/eugenvetrov" className="footer__link">Github</a>
    </div>
  </footer>;

    return (
      <Routes>
        <Route
          path="/"
          element={mainFooter}
        />
        <Route
            path="/signin"
            element={mainFooter}
          />
          <Route
            path="/signup"
            element={mainFooter}
          />
          <Route
            path="/profile"
            element={mainFooter}
          />
          <Route
            path="/movies"
            element={mainFooter}
          />
          <Route
            path="/saved-movies"
            element={mainFooter}
          />
         <Route
            path="/*"
            element={<></>}
          />
      </Routes>
    )
}

export default Footer;