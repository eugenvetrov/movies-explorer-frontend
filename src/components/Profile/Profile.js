import './Profile.css';
import { useState, useEffect, useContext } from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"

const Profile = ({signOut, onEditUser}) => {

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
      };

    const handleSubmit = (event) => {
      event.preventDefault();
      const isSomeFieldEmpty = Object.values(values).some((item) => item === "");
      if (isSomeFieldEmpty) {
          alert("Простите! Поле не должно быть пустым.")
      }
      onEditUser({
        name: values.name,
        email: values.email,
      })
    }

    console.log(values);

    return (
      <section className="profile">
        <p className="profile__title">Привет, {name}!</p>
        <form className="profile__form" onSubmit={(e) => handleSubmit(e)}>
            <label className="profile__form-label">Имя
            <input className="profile__form-text"
                        name="name"
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
        <p className="profile__sign-out" onClick={signOut}>Выйти из аккаунта</p>
      </section>
    )
}

export default Profile;