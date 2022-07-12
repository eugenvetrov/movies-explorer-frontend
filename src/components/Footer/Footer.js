import './Footer.css';
import '../Student/Student.css';

const Footer = () => {
    return (
      <footer className="footer about-project">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <hr className="about-project__line footer__line"/>
        <p className="footer__year">&copy;2020</p>
        <div className="footer__links">
          <a className="student__github-link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
          <a href="https://github.com/eugenvetrov" className="student__github-link footer__link">Github</a>
        </div>
      </footer>
    )
}

export default Footer;