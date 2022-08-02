import './PopupInform.css';
import okImage from '../../images/ok-image.svg';
import errorImage from '../../images/error-image.svg';

const PopupInform = ({isActive, ActiveOff, errorMessage}) => {
    

    return(
      <div className={`popup ${isActive ? 'popup_active' : ""}`} onClick={ActiveOff}>
          <div className="popup__container">
              <img className="popup__status-image" src={ errorMessage ? errorImage : okImage } alt="Статус запроса"/>
        <div className="popup__error-message">
        {
          errorMessage ? `${errorMessage}` : ""
        }
        </div>
          </div>
      </div>
    )
}

export default PopupInform;