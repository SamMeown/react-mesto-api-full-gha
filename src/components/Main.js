import avatar_placeholder from '../images/avatar_placeholder.png'


function Main() {
  return (
    <main className="content">
      <section className="profile page__profile">
        <span className="profile__picture-container">
          <img src={avatar_placeholder} alt="Аватар" className="profile__picture" />
        </span>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name overflow-ready-string"></h1>
            <button className="btn profile__edit-btn" type="button" aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about overflow-ready-string"></p>
        </div>
        <button className="btn profile__add-btn" type="button" aria-label="Добавить место"></button>
      </section>
      <section className="places page__places">
        <ul className="places__list">
        </ul>
      </section>
    </main>
  );
}

export default Main;

