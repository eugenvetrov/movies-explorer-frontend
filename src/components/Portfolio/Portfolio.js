import './Portfolio.css';
import '../AboutProject/AboutProject.css';
import arrowLink from '../../images/arrowLink.svg';

const Portfolio = () => {
    return(
        <section className="portfolio">
          <p className="portfolio__title">Портфолио</p>
          <a className="portfolio__link" href="https://eugenvetrov.github.io/how-to-learn/">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img className="portfolio__link-image" src={arrowLink} alt="Картинка стрелки для ссылки"/>
          </a>
          <a className="portfolio__link" href="https://eugenvetrov.github.io/yet-another-project/">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img className="portfolio__link-image" src={arrowLink} alt="Картинка стрелки для ссылки"/>
          </a>
          <a className="portfolio__link" href="http://evg.vetrow.mesto.nomoreparties.sbs">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img className="portfolio__link-image" src={arrowLink} alt="Картинка стрелки для ссылки"/>
          </a> 
        </section>
    )
}

export default Portfolio;