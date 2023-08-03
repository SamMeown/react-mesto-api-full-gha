import img_placeholder from '../images/places_placeholder.png'

function PopupWithImage() {
  return (
    <div className="popup popup_type_image page__place-image-popup">
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
        <img src={img_placeholder} alt="" className="popup__image" />
        <p className="popup__image-caption"></p>
      </div>
    </div>
  );
}

export default PopupWithImage;