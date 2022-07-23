import './Login.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    
    const [values, setValues] = useState({
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
            alert(`${values.email}, ${values.password}`)
        }
      }

    return (
        <section className="auth">
        <p className="auth__title">Рады видеть!</p>
        <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
            <label className="auth__form-label">E-mail
                <input type="email" className="auth__form-field"
                     name="email"
                     onChange={handleChange}
                />
                <span className="auth__error  auth__error_visible"
                id="login-email-error"></span>
                
            </label>
            <label className="auth__form-label">Пароль
                <input type="text" className="auth__form-field"
                     name="password"
                     onChange={handleChange}
                />
                <span className="auth__error  auth__error_visible"
                id="login-password-error"></span>
            </label>
            <button className="auth__submit" type="submit">
                Войти
            </button>
        </form>
        <p className="auth__text">Ещё не зарегестрированы?<Link to="../signup" className="auth__link">Регистрация</Link></p>
    </section>
    )
}

export default Login;