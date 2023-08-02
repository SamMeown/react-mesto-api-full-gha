import logo from '../images/logo.svg';


function Header() {
  return (
    <header className="header page__header">
      <img src={logo} alt="Лого" className="logo" />
    </header>
  );
}

export default Header;