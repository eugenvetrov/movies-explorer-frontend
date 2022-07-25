import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <section className="not-found">
            <p className="not-found__number">404</p>
            <p className="not-found__text">Страница не найдена</p>
            <p className="not-found__back" onClick={() => navigate(-1)}>Назад</p>
        </section>
    )
}

export default NotFound;