import './Footer.css';
import { Routes, Route} from "react-router-dom";
import renderPaths from "../../utils/renderPaths"

const Footer = () => {
    return (
      <Routes>
        {renderPaths(["/signin", "/signup", "/profile", "/movies","/saved-movies"],
           <footer className="footer">
           <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
           <hr className="footer__line"/>
           <p className="footer__year">&copy;2020</p>
           <div className="footer__links">
             <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
             <a href="https://github.com/eugenvetrov" className="footer__link">Github</a>
           </div>
         </footer>)}
         <Route
            path="/*"
            element={<></>}
          />
      </Routes>
    )
}

export default Footer;