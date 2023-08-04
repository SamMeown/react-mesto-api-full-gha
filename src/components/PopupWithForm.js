function PopupWithForm({name, title, btnTitle, onClose, children, isOpen}) {
  return (
    <div 
      className={`popup page__${name}-popup ${isOpen ? 'popup_opened' : ''}`.trim()} 
      onClick={evt => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button className="popup__close-btn btn" type="button" onClick={onClose} aria-label="Закрыть"></button>
        <form className="form popup__form" name={`${name}-form`} noValidate>
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

