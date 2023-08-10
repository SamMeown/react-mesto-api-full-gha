import { Link } from "react-router-dom";

function MainWithForm({name, title, btnTitle, linkTitle, linkPath, onSubmit, children}) {
  return (
    <main className="content">
      <section className="register page__register">
        <form className="form form_theme_dark page__form" name={`${name}-form`} onSubmit={onSubmit} noValidate>
          <h2 className="form__title form__title_style_page">{title}</h2>
          <fieldset className="form__fieldset form__fieldset_set_inputs">
            {children}
          </fieldset>
          <button type="submit" className="form__submit-btn form__submit-btn_style_page form__submit-btn_theme_dark">{btnTitle}</button>
          <Link className="form__link" to={linkPath ?? "#"} style={linkTitle ? {} : {visibility: 'hidden'}}>{linkTitle}</Link>
        </form>
      </section>
    </main>
  );
}

export default MainWithForm;