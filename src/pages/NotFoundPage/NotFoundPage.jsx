import { Link } from "react-router";

import Container from "../../components/Container/Container";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <section className={css.page}>
      <Container className={css.content}>
        <p className={css.code}>404</p>
        <h1>Page not found</h1>
        <p className={css.description}>The requested page does not exist.</p>

        <Link className={css.link} to="/">
          Return home
        </Link>
      </Container>
    </section>
  );
}

export default NotFoundPage;
