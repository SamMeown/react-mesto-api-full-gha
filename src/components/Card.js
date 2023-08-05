import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import places_placeholder from '../images/places_placeholder.png';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser != null && card.owner._id === currentUser._id;
  const isLiked = currentUser != null && card.likes.some(like => like._id === currentUser._id)

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__item">
      <img src={card.link ?? places_placeholder} alt={card.name} className="places__image" onClick={handleClick}/>
      <div className="places__footer">
        <h2 className="places__name overflow-ready-string">{card.name}</h2>
        <div className="places__like-container">
          <button 
            className={`btn places__like-btn ${isLiked ? 'places__like-btn_clicked' : ''}`} 
            type="button" 
            onClick={handleLikeClick}
            aria-label="Лайк"
          ></button>
          <p className="places__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button 
        className="btn places__delete-btn" 
        type="button" 
        style={isOwn ? {} : {display: 'none'}} 
        onClick={handleDeleteClick}
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;