import { Link, useParams } from "react-router-dom";

function VerticalNav() {
  const { id } = useParams();
  return (
    <div className="side-nav">
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`/${id}`} className="link-side-nav">
                <img src="img/sidenav-icon1.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={`/${id}`} className="link-side-nav">
                <img src="img/sidenav-icon2.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={`/${id}`} className="link-side-nav">
                <img src="img/sidenav-icon3.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={`/${id}`} className="link-side-nav">
                <img src="img/sidenav-icon4.svg" alt="" />
              </Link>
            </li>
          </ul>
        </nav>
        <p className="copyright-text">Copiryght, SportSee 2020</p>
      </div>
    </div>
  );
}

export default VerticalNav;
