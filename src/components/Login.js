import { useEffect } from "react";
import useForm from "../hooks/form";
import auth from "../utils/auth";
import MainWithForm from "./MainWithForm";

function Login({onSuccess}) {

  const {values, setValues, handleChange} = useForm({email: "", password: ""});

  useEffect(() => {
    return () => {
      setValues({
        email: "", 
        password: ""
      });
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    const {email, password} = values;
    if (!email || !password) {
      return;
    }

    auth.authorize(email, password)
    .then(data => {
      onSuccess(email);
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
    })
  }

  return (
    <MainWithForm name="login" title="Вход" btnTitle="Войти" onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="email-input" type="text" name="email" placeholder="Email" value={values.email} minLength="2" maxLength="40" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="password-input" type="password" name="password" placeholder="Пароль" value={values.password} minLength="2" maxLength="200" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_about-input"></span>
      </label>
    </MainWithForm>
  );
}

export default Login;