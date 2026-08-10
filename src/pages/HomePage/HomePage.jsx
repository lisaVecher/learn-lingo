import { Link } from "react-router";

import girlImage from "../../assets/girl.svg";
import Container from "../../components/Container/Container";
import css from "./HomePage.module.css";

const statistics = [
  {
    value: "32,000 +",
    label: ["Experienced", "tutors"],
  },
  {
    value: "300,000 +",
    label: ["5-star tutor", "reviews"],
  },
  {
    value: "120 +",
    label: ["Subjects", "taught"],
  },
  {
    value: "200 +",
    label: ["Tutor", "nationalities"],
  },
];

function LaptopIllustration() {
  return (
    <svg
      className={css.mac}
      viewBox="0 0 391 176"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g clipPath="url(#laptop-clip)">
        <path
          d="M22.0579 0C18.5133 0 15.64 2.87903 15.64 6.43046V240.821C15.64 244.372 18.5133 247.251 22.0579 247.251H368.942C372.487 247.251 375.36 244.372 375.36 240.821V6.43046C375.36 2.87903 372.487 0 368.942 0H22.0579Z"
          fill="url(#laptop-body)"
        />
        <path
          d="M207.091 66.3851C207.091 69.1751 206.092 71.78 204.101 74.1909C201.698 77.0572 198.792 78.7134 195.641 78.4521C195.601 78.1175 195.577 77.7652 195.577 77.3949C195.577 74.7168 196.72 71.8504 198.749 69.5069C199.762 68.3203 201.05 67.3338 202.613 66.5467C204.172 65.7713 205.646 65.3425 207.033 65.2692C207.051 65.4351 207.065 65.6009 207.074 65.7664C207.085 65.9733 207.091 66.1797 207.091 66.3851Z"
          fill="url(#laptop-logo)"
        />
        <path
          d="M217.639 108.742C216.812 110.691 215.834 112.485 214.7 114.134C213.155 116.383 211.889 117.939 210.914 118.803C209.402 120.222 207.782 120.949 206.048 120.99C204.803 120.99 203.301 120.628 201.553 119.895C199.799 119.165 198.188 118.803 196.714 118.803C195.169 118.803 193.511 119.165 191.738 119.895C189.962 120.628 188.532 121.011 187.438 121.049C185.775 121.121 184.117 120.374 182.462 118.803C181.406 117.863 180.085 116.252 178.502 113.969C176.804 111.531 175.408 108.704 174.315 105.481C173.143 102 172.556 98.6288 172.556 95.3651C172.556 91.6267 173.348 88.4023 174.934 85.7004C176.18 83.5299 177.838 81.818 179.913 80.5612C181.988 79.3043 184.23 78.6639 186.644 78.6229C187.965 78.6229 189.698 79.0399 191.85 79.8593C193.997 80.6816 195.376 81.0985 195.98 81.0985C196.432 81.0985 197.963 80.6111 200.559 79.6389C203.014 78.7376 205.086 78.3643 206.784 78.5113C211.383 78.89 214.838 80.7401 217.136 84.0735C213.023 86.6167 210.988 90.1788 211.029 94.7484C211.066 98.3079 212.331 101.27 214.818 103.622C215.945 104.713 217.204 105.557 218.604 106.156C218.301 107.055 217.98 107.916 217.639 108.742Z"
          fill="url(#laptop-logo)"
        />
      </g>

      <defs>
        <linearGradient
          id="laptop-body"
          x1="195.5"
          y1="0"
          x2="195.5"
          y2="247.251"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-device-start)" />
          <stop offset="1" stopColor="var(--theme-device-end)" />
        </linearGradient>

        <linearGradient
          id="laptop-logo"
          x1="195.58"
          y1="65.2692"
          x2="195.58"
          y2="121.053"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-device-logo-start)" />
          <stop offset="1" stopColor="var(--theme-device-logo-end)" />
        </linearGradient>

        <clipPath id="laptop-clip">
          <rect width="359.72" height="304" transform="translate(15.64)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function StatisticsBorder() {
  return (
    <svg
      className={css.statisticsBorder}
      viewBox="0 0 1312 116"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.75"
        y="0.75"
        width="1310.5"
        height="114.5"
        rx="29.25"
        stroke="var(--theme-main)"
        strokeWidth="1.5"
        strokeDasharray="15 15"
      />
    </svg>
  );
}

function HomePage() {
  return (
    <section className={css.page}>
      <Container>
        <div className={css.hero}>
          <div className={css.heroContent}>
            <h1 className={css.title}>
              Unlock your potential with the best <span>language</span> tutors
            </h1>

            <p className={css.description}>
              Embark on an Exciting Language Journey with Expert Language
              <br />
              Tutors: Elevate your language proficiency to new heights by
              <br />
              connecting with highly qualified and experienced tutors.
            </p>

            <Link className={css.ctaButton} to="/teachers">
              Get started
            </Link>
          </div>

          <div className={css.visual} aria-label="Online language lesson">
            <img
              className={css.girl}
              src={girlImage}
              alt=""
              aria-hidden="true"
            />
            <LaptopIllustration />
          </div>
        </div>

        <div className={css.statisticsFrame}>
          <StatisticsBorder />

          <ul className={css.statistics}>
            {statistics.map((item) => (
              <li className={css.statistic} key={item.label.join("-")}>
                <strong>{item.value}</strong>
                <span>
                  {item.label[0]}
                  <br />
                  {item.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default HomePage;
