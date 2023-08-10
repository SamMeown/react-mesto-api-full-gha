import logo from '../images/logo.svg';


function Header() {
  return (
    <header className="header page__header">
      <img src={logo} alt="Лого" className="logo" />
      <nav className="header__menu">
        <p className="header__menu-info header__menu_visible">email@example.com</p>
        <a className="header__menu-link header__menu_visible" href="#">Регистрация</a>
        <a className="header__menu-link header__menu_visible" href="#">Войти</a>
        <a className="header__menu-link" href="#">Выйти</a>
      </nav>
    </header>
  );
}

export default Header;