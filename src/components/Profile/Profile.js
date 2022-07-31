import './Profile.css';
import { useState, useEffect, useContext } from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"

const Profile = ({signOut, onEditUser, formErrors, validateField, formValid}) => {

    const user = useContext(CurrentUserContext)

    const [values, setValues] = useState({
        name: "",
        email: ""
      });

    const [name, setName] = useState();

    useEffect(() => {
      if (user) {
        setName(user.name);
      }
    }, [user])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateField(name, value);
      };

    const handleSubmit = (event) => {
      event.preventDefault();
      const isSomeFieldEmpty = Object.values(values).some((item) => item === "");
      formValid && !isSomeFieldEmpty ?
        onEditUser({
          name: values.name,
          email: values.email,
        }) : alert("Простите! Какое-то из полей заполнено некорректно.");
    }

    return (
      <section className="profile">
        <p className="profile__title">Привет, {name}!</p>
        <form className="profile__form" autoComplete="off"
          noValidate onSubmit={(e) => handleSubmit(e)}>
            <label className="profile__form-label">Имя
            <input className="profile__form-text"
                        name="name"
                        onChange={handleChange}
            />
            </label>
            <span className="profile__error  profile__error_visible">{formErrors.name}</span>
            <hr className="profile__form-line"/>
            <label className="profile__form-label">E-mail
            <input className="profile__form-text"
                        name="email"
                        onChange={handleChange}
            />
            </label>
            <span className="profile__error  profile__error_visible">{formErrors.email}</span>
            <button className={`profile__submit ${formValid ? "" : "profile__submit_disable"}`} type="submit">
              Редактировать
            </button>
        </form>
        <p className="profile__sign-out" onClick={signOut}>Выйти из аккаунта</p>
      </section>
    )
}

export default Profile;