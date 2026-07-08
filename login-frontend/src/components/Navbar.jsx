import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  window.onresize = function () {
    var w = window.outerWidth;

    if (w > 768) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
        <ClipboardDocumentListIcon className={styles.logo} />
        <h1 className={styles.brandName}>Todo</h1>
      </Link>
      <ul className={menuOpen ? styles.responsiveNavLinks : styles.navLinks}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#43355A" : "",
            })}
            onClick={() => setMenuOpen(false)}
            className={styles.navLinksIndividual}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todolists"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#43355A" : "",
            })}
            onClick={() => setMenuOpen(false)}
            className={styles.navLinksIndividual}
          >
            Todolists
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#43355A" : "",
            })}
            onClick={() => setMenuOpen(false)}
            className={styles.navLinksIndividual}
          >
            About
          </NavLink>
          <NavLink
            to="/account"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#43355A" : "",
            })}
            onClick={() => setMenuOpen(false)}
            className={menuOpen ? styles.navLinksIndividual : styles.hiddenLink}
          >
            Account
          </NavLink>
        </li>
      </ul>
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <XMarkIcon /> : <Bars3Icon />}
      </div>
      <NavLink
        to="/account"
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#43355A" : "",
        })}
        className={styles.accountIcon}
      >
        <UserCircleIcon />
      </NavLink>
    </nav>
  );
}
