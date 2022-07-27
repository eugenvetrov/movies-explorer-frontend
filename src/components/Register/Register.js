import './Register.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {

    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
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
            alert(`${values.userName}, ${values.email}, ${values.password}`)
        }
        onRegister({
            password: values.password,
            email: values.email,
          });
      }

    return (
        <section className="auth">
            <p className="auth__title">Добро пожаловать!</p>
            <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
                <label className="auth__form-label">Имя
                    <input type="text" className="auth__form-field"
                         name="userName"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible"
                         id="auth-name-error"></span>
                </label>
                <label className="auth__form-label">E-mail
                    <input type="email" className="auth__form-field"
                         name="email"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible"
                         id="auth-email-error">Текст ошибки</span>
                </label>
                <label className="auth__form-label">Пароль
                    <input type="text" className="auth__form-field"
                         name="password"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible"
                         id="auth-password-error"></span>
                </label>
                <button className="auth__submit" type="submit">
                    Зарегестрироваться
                </button>
            </form>
            <p className="auth__text">Уже зарегестрированы?<Link to="../signin" className="auth__link">Войти</Link></p>
        </section>
    )
}

export default Register;