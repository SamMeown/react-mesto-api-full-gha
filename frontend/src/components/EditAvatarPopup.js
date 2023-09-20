import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, onUpdateAvatar, isOpen}) {

  const linkRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: linkRef.current.value
    });
  }

  useEffect(() => {
    return () => {
      if (!isOpen) {
        linkRef.current.value = "";
      }
    }
  }, [isOpen]);

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" btnTitle="Сохранить" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen}>
      <label className="form__field">
        <input className="form__input" id="avatar-link-input" type="url" name="link" placeholder="Ссылка на аватар" defaultValue="" ref={linkRef} required />
        <span className="form__input-error form__input-error_el_avatar-link-input"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
