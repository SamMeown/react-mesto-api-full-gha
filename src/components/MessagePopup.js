import message_img from "../images/message_success.png"

function MessagePopup({title, onClose, isOpen}) {
  return (
    <div 
      className={`popup page__message-popup ${isOpen ? 'popup_opened' : ''}`.trim()} 
      onClick={evt => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button className="popup__close-btn btn" type="button" onClick={onClose} aria-label="Закрыть"></button>
        <div className="message popup__message">
          <img src={message_img} alt={"Иконка сообщения"} className="message__image" />
          <h2 className="message__text">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default MessagePopup;