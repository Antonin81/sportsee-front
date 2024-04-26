import { Link } from "react-router-dom";

function HorizontalNav() {
  return (
    <header>
      <img src="/logo.svg" alt="" />
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Accueil</Link>
          </li>
          <li>
            <Link to={`/`}>Profil</Link>
          </li>
          <li>
            <Link to={`/`}>Réglage</Link>
          </li>
          <li>
            <Link to={`/`}>Communauté</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HorizontalNav;
