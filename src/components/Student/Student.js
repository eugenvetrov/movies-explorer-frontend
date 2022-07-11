import './Student.css';
import me from '../../images/me.jpg';

const Student = () => {
  return(
    <section className="about-project">
        <h2 className="about-project__title">Студент</h2>
        <hr className="about-project__line"/>
        <div className="student">
            <p className="about-project__title student__title">Евгений</p>
            <p className="student__description">Фронтенд-разработчик, 33 года</p>
            <p className="student__text">Люблю творческие задачи и много учиться.
             Больше всего в жизни мне интересны наука и общение с людьми.
              Веб-разработка привлекает меня как раз тем, что это наукоемкая, социальная деятельность.</p>
            <a href="https://github.com/eugenvetrov" className="student__github-link">Github</a>
            <img src={me} className="student__photo" alt="фото студента" />
        </div>
    </section>
  )
}

export default Student;