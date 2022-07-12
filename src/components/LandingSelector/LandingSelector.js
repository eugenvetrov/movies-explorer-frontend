import './LandingSelector.css';
import { HashLink as Link } from 'react-router-hash-link';

const LandingSelector = () => {
    return(
        <div className="landing-selector">
            <Link to="/#about" className="landing-selector__link">О проекте</Link>
            <Link to="/#technology" className="landing-selector__link">Технологии</Link>
            <Link to="/#student" className="landing-selector__link">Студент</Link>
        </div>
    )
}

export default LandingSelector;