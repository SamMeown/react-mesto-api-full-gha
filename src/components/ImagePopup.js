import img_placeholder from '../images/places_placeholder.png'

function ImagePopup({card, onClose}) {
  return (
    <div 
      className={`popup popup_type_image page__place-image-popup ${card ? 'popup_opened' : ''}`}
      onClick={evt => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-btn btn" type="button" onClick={onClose} aria-label="Закрыть"></button>
        <img src={card ? card.link : img_placeholder} alt={card ? card.name : ""} className="popup__image" />
        <p className="popup__image-caption">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;