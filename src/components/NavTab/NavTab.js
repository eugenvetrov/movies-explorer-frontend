import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => {
    return(
        <div className="landing-selector">
            <Link to="/#about" className="landing-selector__link">О проекте</Link>
            <Link to="/#techs" className="landing-selector__link">Технологии</Link>
            <Link to="/#about-me" className="landing-selector__link">Студент</Link>
        </div>
    )
}

export default NavTab;