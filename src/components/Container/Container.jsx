import css from "./Container.module.css";

function Container({ children, className = "", ...props }) {
  return (
    <div className={`${css.container} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Container;
