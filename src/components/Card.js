import places_placeholder from '../images/places_placeholder.png';

function Card({card}) {
  return (
    <li className="places__item">
      <img src={card.link ?? places_placeholder} alt={card.name} className="places__image" />
      <div className="places__footer">
        <h2 className="places__name overflow-ready-string">{card.name}</h2>
        <div className="places__like-container">
          <button 
            className={`btn places__like-btn ${card.liked ? 'places__like-btn_clicked' : ''}`} 
            type="button" 
            aria-label="Лайк"
          ></button>
          <p className="places__like-counter">{card.likesCount}</p>
        </div>
      </div>
      <button 
        className="btn places__delete-btn" 
        type="button" 
        style={card.removable ? {} : {display: 'none'}} 
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;