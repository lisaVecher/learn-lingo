import css from "./Loader.module.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <span className={css.loader} aria-hidden="true" />
      <span className={css.text}>{text}</span>
    </div>
  );
}

export default Loader;