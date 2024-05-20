import "./header.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Flix Movies
      </Link>
      <Link className="favoritos" to="/favoritos">
        <FontAwesomeIcon icon={faClapperboard} /> Meus Filmes
      </Link>
    </header>
  );
}

export default Header;

