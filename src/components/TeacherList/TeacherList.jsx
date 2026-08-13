import TeacherCard from "../TeacherCard/TeacherCard";
import css from "./TeacherList.module.css";

function TeacherList({ teachers, onBook }) {
  return (
    <ul className={css.list}>
      {teachers.map((teacher) => (
        <li key={teacher.id}>
          <TeacherCard teacher={teacher} onBook={onBook} />
        </li>
      ))}
    </ul>
  );
}

export default TeacherList;
