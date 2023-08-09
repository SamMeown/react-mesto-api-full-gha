import { useEffect } from "react";
import useForm from "../hooks/form";

function Register({name, title, btnTitle, isOpen}) {

  const {values, setValues, handleChange} = useForm({email: "", password: ""});

  useEffect(() => {
    return () => {
      if (!isOpen) {
        setValues({
          email: "", 
          password: ""
        });
      }
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="content">
      <section className="register page__register">
        <form className="form form_theme_dark page__form" name={`${name}-form`} onSubmit={handleSubmit} noValidate>
          <h2 className="form__title form__title_style_page">{title}</h2>
          <fieldset className="form__fieldset form__fieldset_set_inputs">
            <label className="form__field">
              <input className="form__input form__input_style_page form__input_theme_dark" id="email-input" type="text" name="email" placeholder="Email" value={values.email} minLength="2" maxLength="40" onChange={handleChange} required />
              <span className="form__input-error form__input-error_el_name-input"></span>
            </label>
            <label className="form__field">
              <input className="form__input form__input_style_page form__input_theme_dark" id="password-input" type="password" name="password" placeholder="Пароль" value={values.password} minLength="2" maxLength="200" onChange={handleChange} required />
              <span className="form__input-error form__input-error_el_about-input"></span>
            </label>
          </fieldset>
          <button type="submit" className="form__submit-btn form__submit-btn_style_page form__submit-btn_theme_dark">{btnTitle}</button>
          <a className="form__link" href="#">Уже зарегистрированы? Войти</a>
        </form>
      </section>
    </main>
  );
}

export default Register;