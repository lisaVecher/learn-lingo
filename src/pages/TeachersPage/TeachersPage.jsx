import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import BookingModal from "../../components/BookingModal/BookingModal";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import TeacherList from "../../components/TeacherList/TeacherList";
import {
  fetchAllTeachers,
  fetchTeachersPage,
} from "../../services/teachersService";
import { filterTeachers } from "../../utils/filterTeachers";
import css from "./TeachersPage.module.css";

const initialFilters = {
  language: "",
  level: "",
  price: "",
};

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const loadInitialTeachers = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await fetchTeachersPage();

      setTeachers(result.teachers);
      setLastKey(result.lastKey);
      setHasMore(result.hasMore);
    } catch {
      toast.error("Could not load teachers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialTeachers();
  }, [loadInitialTeachers]);

  useEffect(() => {
    if (!hasActiveFilters || allTeachers.length > 0) {
      return;
    }

    let ignore = false;

    const loadAllTeachers = async () => {
      setIsFiltering(true);

      try {
        const result = await fetchAllTeachers();

        if (!ignore) {
          setAllTeachers(result);
        }
      } catch {
        if (!ignore) {
          toast.error("Could not apply teacher filters");
        }
      } finally {
        if (!ignore) {
          setIsFiltering(false);
        }
      }
    };

    loadAllTeachers();

    return () => {
      ignore = true;
    };
  }, [allTeachers.length, hasActiveFilters]);

  const visibleTeachers = useMemo(() => {
    const source = hasActiveFilters ? allTeachers : teachers;

    return filterTeachers(source, filters);
  }, [allTeachers, filters, hasActiveFilters, teachers]);

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleLoadMore = async () => {
    if (!lastKey || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const result = await fetchTeachersPage(lastKey);

      setTeachers((current) => {
        const existingIds = new Set(current.map((teacher) => teacher.id));

        const newTeachers = result.teachers.filter(
          (teacher) => !existingIds.has(teacher.id),
        );

        return [...current, ...newTeachers];
      });

      setLastKey(result.lastKey);
      setHasMore(result.hasMore);
    } catch {
      toast.error("Could not load more teachers");
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <Loader text="Loading teachers..." />;
  }

  return (
    <section className={css.page}>
      <Container className={css.content}>
        <h1 className={css.visuallyHidden}>Language teachers</h1>

        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {isFiltering ? (
          <Loader text="Applying filters..." />
        ) : visibleTeachers.length > 0 ? (
          <TeacherList teachers={visibleTeachers} onBook={setSelectedTeacher} />
        ) : (
          <div className={css.empty}>
            <h2>No teachers found</h2>
            <p>Change or clear the selected filters.</p>

            {hasActiveFilters && (
              <button
                className={css.clearButton}
                type="button"
                onClick={handleResetFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {!hasActiveFilters && hasMore && teachers.length > 0 && (
          <button
            className={css.loadMoreButton}
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
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

export default TeachersPage;
