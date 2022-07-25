import './Profile.css';
import { useState } from "react";

const Profile = ({name}) => {

    const [values, setValues] = useState({
        userName: "",
        email: ""
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleSubmit = (event) => {
      event.preventDefault();
      const isSomeFieldEmpty = Object.values(values).some((item) => item === "");
      if (isSomeFieldEmpty) {
          alert("Простите! Поле не должно быть пустым.")
      } else {
          alert(`${values.userName}, ${values.email}`)
      }
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        alert("Выходим");
    }

    return (
      <section className="profile">
        <p className="profile__title">Привет, {name}!</p>
        <form className="profile__form" onSubmit={(e) => handleSubmit(e)}>
            <label className="profile__form-label">Имя
            <input className="profile__form-text"
                        name="userName"
                        onChange={handleChange}
            />
            </label>
            <hr className="profile__form-line"/>
            <label className="profile__form-label">E-mail
            <input className="profile__form-text"
                        name="email"
                        onChange={handleChange}
            />
            </label>
            <button className="profile__submit" type="submit">
              Редактировать
            </button>
        </form>
        <p className="profile__sign-out" onClick={handleSignOut}>Выйти из аккаунта</p>
      </section>
    )
}

export default Profile;