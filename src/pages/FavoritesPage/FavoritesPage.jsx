import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import BookingModal from "../../components/BookingModal/BookingModal";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import TeacherList from "../../components/TeacherList/TeacherList";
import { useFavorites } from "../../hooks/useFavorites";
import { fetchAllTeachers } from "../../services/teachersService";
import css from "./FavoritesPage.module.css";

function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadTeachers = async () => {
      setIsLoading(true);

      try {
        const result = await fetchAllTeachers();

        if (!ignore) {
          setTeachers(result);
        }
      } catch {
        if (!ignore) {
          toast.error("Could not load favorite teachers");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadTeachers();

    return () => {
      ignore = true;
    };
  }, []);

  const favoriteTeachers = useMemo(() => {
    const favoriteSet = new Set(favoriteIds.map(String));

    return teachers.filter((teacher) => favoriteSet.has(String(teacher.id)));
  }, [favoriteIds, teachers]);

  if (isLoading) {
    return <Loader text="Loading favorite teachers..." />;
  }

  return (
    <section className={css.page}>
      <Container className={css.content}>
        <h1 className={css.title}>Favorites</h1>

        {favoriteTeachers.length > 0 ? (
          <TeacherList
            teachers={favoriteTeachers}
            onBook={setSelectedTeacher}
          />
        ) : (
          <div className={css.empty}>
            <h2>No favorite teachers yet</h2>
            <p>
              Open the Teachers page and click the heart icon to save a teacher.
            </p>
          </div>
        )}
      </Container>

      <BookingModal
        teacher={selectedTeacher}
        isOpen={Boolean(selectedTeacher)}
        onClose={() => setSelectedTeacher(null)}
      />
    </section>
  );
}

export default FavoritesPage;
