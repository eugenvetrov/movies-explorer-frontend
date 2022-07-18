import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle.js';
import me from '../../images/me.jpg';

const AboutMe = () => {
  return(
    <section className="about-me-section" id="about-me">
        <SectionTitle title="Студент" />
        <div className="about-me">
            <p className="about-me__title">Евгений</p>
            <p className="about-me__description">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__text">Люблю творческие задачи и много учиться.
             Больше всего в жизни мне интересны наука и общение с людьми.
              Веб-разработка привлекает меня как раз тем, что это наукоемкая, социальная деятельность.</p>
            <a href="https://github.com/eugenvetrov" className="about-me__github-link">Github</a>
            <img src={me} className="about-me__photo" alt="фото студента" />
        </div>
    </section>
  )
}

export default AboutMe;