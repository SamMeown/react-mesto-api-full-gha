import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen}) {
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" btnTitle="Сохранить" onClose={onClose} isOpen={isOpen}>
      <label className="form__field">
        <input className="form__input" id="avatar-link-input" type="url" name="link" placeholder="Ссылка на аватар" value="" required />
        <span className="form__input-error form__input-error_el_avatar-link-input"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
