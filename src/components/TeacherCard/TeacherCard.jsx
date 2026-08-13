import { useState } from "react";
import toast from "react-hot-toast";

import activeHeartIcon from "../../assets/activeheart.svg";
import bookOpenIcon from "../../assets/bookopen.svg";
import emptyHeartIcon from "../../assets/emptyheart.svg";
import onlineIcon from "../../assets/online.svg";
import starIcon from "../../assets/star.svg";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import css from "./TeacherCard.module.css";

function TeacherCard({ teacher, onBook }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(teacher.id);
  const fullName = `${teacher.name} ${teacher.surname}`;

  const handleFavorite = () => {
    if (!user) {
      toast.error("Please log in to add teachers to favorites");
      return;
    }

    if (favorite) {
      removeFavorite(teacher.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(teacher.id);
      toast.success("Added to favorites");
    }
  };

  return (
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <img className={css.avatar} src={teacher.avatar_url} alt={fullName} />
        <img
          className={css.onlineIcon}
          src={onlineIcon}
          alt=""
          aria-hidden="true"
        />
        <span className={css.visuallyHidden}>Online</span>
      </div>

      <div className={css.content}>
        <div className={css.heading}>
          <div>
            <p className={css.subtitle}>Languages</p>
            <h2 className={css.name}>{fullName}</h2>
          </div>

          <ul className={css.statistics} aria-label="Teacher statistics">
            <li className={css.statistic}>
              <img
                className={css.statisticIcon}
                src={bookOpenIcon}
                alt=""
                aria-hidden="true"
              />
              Lessons online
            </li>

            <li className={css.statistic}>
              Lessons done: {teacher.lessons_done}
            </li>

            <li className={css.statistic}>
              <img
                className={css.statisticIcon}
                src={starIcon}
                alt=""
                aria-hidden="true"
              />
              Rating: {teacher.rating}
            </li>

            <li className={css.statistic}>
              Price / 1 hour:{" "}
              <span className={css.price}>{teacher.price_per_hour}$</span>
            </li>
          </ul>

          <button
            className={css.favoriteButton}
            type="button"
            onClick={handleFavorite}
            aria-label={
              favorite
                ? `Remove ${fullName} from favorites`
                : `Add ${fullName} to favorites`
            }
          >
            <span
              className={`${css.heartIcon} ${
                favorite ? css.iconHidden : css.iconVisible
              }`}
              aria-hidden="true"
            >
              <img src={emptyHeartIcon} alt="" />
            </span>

            <span
              className={`${css.heartIcon} ${
                favorite ? css.iconVisible : css.iconHidden
              }`}
              aria-hidden="true"
            >
              <img src={activeHeartIcon} alt="" />
            </span>
          </button>
        </div>

        <dl className={css.details}>
          <div className={css.detailRow}>
            <dt>Speaks:</dt>
            <dd className={css.languages}>{teacher.languages.join(", ")}</dd>
          </div>

          <div className={css.detailRow}>
            <dt>Lesson Info:</dt>
            <dd>{teacher.lesson_info}</dd>
          </div>

          <div className={css.detailRow}>
            <dt>Conditions:</dt>
            <dd>{teacher.conditions.join(" ")}</dd>
          </div>
        </dl>

        {isExpanded && (
          <div className={css.expandedContent}>
            <p className={css.experience}>{teacher.experience}</p>

            {teacher.reviews.length > 0 && (
              <ul className={css.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li
                    className={css.review}
                    key={`${review.reviewer_name}-${index}`}
                  >
                    <div className={css.reviewHeading}>
                      <span className={css.reviewerAvatar} aria-hidden="true">
                        {review.reviewer_name?.charAt(0).toUpperCase()}

                        {review.reviewer_avatar_url && (
                          <img
                            className={css.reviewerAvatarImage}
                            src={review.reviewer_avatar_url}
                            alt=""
                            onError={(event) => {
                              event.currentTarget.hidden = true;
                            }}
                          />
                        )}
                      </span>

                      <div>
                        <p className={css.reviewerName}>
                          {review.reviewer_name}
                        </p>

                        <p className={css.reviewRating}>
                          <img
                            className={css.statisticIcon}
                            src={starIcon}
                            alt=""
                            aria-hidden="true"
                          />
                          {review.reviewer_rating}
                        </p>
                      </div>
                    </div>

                    <p className={css.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          className={css.readMoreButton}
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>

        <ul className={css.levels} aria-label="Teacher levels">
          {teacher.levels.map((level) => (
            <li className={css.level} key={level}>
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <button
            className={css.bookingButton}
            type="button"
            onClick={() => onBook(teacher)}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </article>
  );
}

export default TeacherCard;
