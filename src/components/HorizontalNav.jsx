import { Link, useParams } from "react-router-dom";

function HorizontalNav() {
  const { id } = useParams();
  return (
    <header>
      <img src="/img/logo.svg" alt="" />
      <nav>
        <ul>
          <li>
            <Link to={`/user/${id}`}>Accueil</Link>
          </li>
          <li>
            <Link to={`/user/${id}`}>Profil</Link>
          </li>
          <li>
            <Link to={`/user/${id}`}>Réglage</Link>
          </li>
          <li>
            <Link to={`/user/${id}`}>Communauté</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HorizontalNav;
