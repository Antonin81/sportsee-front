import { Link, useParams } from "react-router-dom";

function HorizontalNav() {
  const { id } = useParams();
  return (
    <header>
      <img src="/logo.svg" alt="" />
      <nav>
        <ul>
          <li>
            <Link to={`/${id}`}>Accueil</Link>
          </li>
          <li>
            <Link to={`/${id}`}>Profil</Link>
          </li>
          <li>
            <Link to={`/${id}`}>Réglage</Link>
          </li>
          <li>
            <Link to={`/${id}`}>Communauté</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HorizontalNav;
