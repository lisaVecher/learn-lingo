import { NavLink } from "react-router";
import toast from "react-hot-toast";

import ukraineLogo from "../../assets/ukrainelogo.svg";
import { useAuth } from "../../hooks/useAuth";
import Container from "../Container/Container";
import css from "./Header.module.css";

function getLinkClass({ isActive }) {
  return `${css.link} ${isActive ? css.activeLink : ""}`;
}

function Header({ onOpenAuth }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have logged out");
    } catch {
      toast.error("Could not log out");
    }
  };

  return (
    <header className={css.header}>
      <Container className={css.content}>
        <NavLink className={css.logo} to="/" aria-label="LearnLingo home">
          <img
            className={css.logoIcon}
            src={ukraineLogo}
            alt=""
            aria-hidden="true"
          />
          <span>LearnLingo</span>
        </NavLink>

        <nav className={css.navigation} aria-label="Main navigation">
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkClass} to="/teachers">
            Teachers
          </NavLink>

          {user && (
            <NavLink className={getLinkClass} to="/favorites">
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={css.actions}>
          {user ? (
            <>
              <span className={css.userName} title={user.email}>
                {user.displayName || user.email?.split("@")[0]}
              </span>

              <button
                className={css.logoutButton}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className={css.loginButton}
                type="button"
                onClick={() => onOpenAuth("login")}
              >
                <span className={css.loginIcon} aria-hidden="true" />
                Log in
              </button>

              <button
                className={css.registerButton}
                type="button"
                onClick={() => onOpenAuth("register")}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
