function PopupWithForm({name, title, btnTitle, children}) {
  return (
    <div className={`popup page__${name}-popup`}>
      <div className="popup__container">
        <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
        <form className="form popup__form" name={`${name}-form`} novalidate>
          <h2 className="form__title">{title}</h2>
          <fieldset className="form__fieldset form__fieldset_set_inputs">
            {children}
          </fieldset>
          <button type="submit" className={`form__submit-btn${children ? '' : ' form__submit-btn_type_confirm'}`}>{btnTitle}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

