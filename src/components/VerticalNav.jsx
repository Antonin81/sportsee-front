import { Link } from "react-router-dom";

function VerticalNav() {
  return (
    <div className="side-nav">
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"} className="link-side-nav">
                <img src="sidenav-icon1.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="link-side-nav">
                <img src="sidenav-icon2.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="link-side-nav">
                <img src="sidenav-icon3.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="link-side-nav">
                <img src="sidenav-icon4.svg" alt="" />
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
