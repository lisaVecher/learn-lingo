import { NavLink } from "react-router";
import toast from "react-hot-toast";

import loginIcon from "../../assets/login.svg";
import ukraineLogo from "../../assets/ukrainelogo.svg";
import { themeOptions } from "../../data/themes";
import { useAuth } from "../../hooks/useAuth";
import Container from "../Container/Container";
import css from "./Header.module.css";

function getLinkClass({ isActive }) {
  return `${css.link} ${isActive ? css.activeLink : ""}`;
}

function Header({
  onOpenAuth,
  theme,
  isRandomTheme,
  onSelectTheme,
  onEnableRandomTheme,
}) {
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

        <div className={css.themePicker} role="group" aria-label="Color theme">
          <button
            className={`${css.randomThemeButton} ${
              isRandomTheme ? css.selectedTheme : ""
            }`}
            type="button"
            onClick={onEnableRandomTheme}
            aria-label="Use a random color theme"
            aria-pressed={isRandomTheme}
            title="Random theme"
          >
            ↻
          </button>

          {themeOptions.map((option) => {
            const isSelected = !isRandomTheme && theme === option.id;

            return (
              <button
                className={`${css.themeButton} ${css[option.id]} ${
                  isSelected ? css.selectedTheme : ""
                }`}
                type="button"
                key={option.id}
                onClick={() => onSelectTheme(option.id)}
                aria-label={`Use ${option.label.toLowerCase()} theme`}
                aria-pressed={isSelected}
                title={`${option.label} theme`}
              />
            );
          })}
        </div>

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
                <img
                  className={css.loginIcon}
                  src={loginIcon}
                  alt=""
                  aria-hidden="true"
                />
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
