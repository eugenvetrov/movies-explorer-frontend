import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <hr className="footer__line"/>
        <p className="footer__year">&copy;2020</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
          <a href="https://github.com/eugenvetrov" className="footer__link">Github</a>
        </div>
      </footer>
    )
}

export default Footer;