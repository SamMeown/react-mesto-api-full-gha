import { useState, useEffect } from "react";
import useForm from "../hooks/form";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, onAddPlace, isOpen}) {

  const {values, setValues, handleChange} = useForm({name: "", link: ""});

  useEffect(() => {
    return () => {
      if (!isOpen) {
        setValues({
          name: "", 
          link: ""
        });
      }
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm name="place" title="Новое место" btnTitle="Создать" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen}>
      <label className="form__field">
        <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value={values.name} minLength="2" maxLength="30" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_place-name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value={values.link} onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_place-link-input"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
