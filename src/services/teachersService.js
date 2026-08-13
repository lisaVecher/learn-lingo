import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

import { database } from "./firebase";

const PAGE_SIZE = 4;

function toArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  return [];
}

function normalizeTeacher(id, teacher) {
  return {
    id,
    ...teacher,
    languages: toArray(teacher.languages),
    levels: toArray(teacher.levels),
    conditions: toArray(teacher.conditions),
    reviews: toArray(teacher.reviews),
    price_per_hour: Number(teacher.price_per_hour ?? 0),
    lessons_done: Number(teacher.lessons_done ?? 0),
    rating: Number(teacher.rating ?? 0),
  };
}

function normalizeSnapshot(snapshot) {
  if (!snapshot.exists()) {
    return [];
  }

  return Object.entries(snapshot.val()).map(([id, teacher]) =>
    normalizeTeacher(id, teacher),
  );
}

export async function fetchTeachersPage(lastKey = null) {
  const teachersReference = ref(database, "teachers");

  const teachersQuery = lastKey
    ? query(
        teachersReference,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE + 1),
      )
    : query(teachersReference, orderByKey(), limitToFirst(PAGE_SIZE + 1));

  const snapshot = await get(teachersQuery);
  const receivedTeachers = normalizeSnapshot(snapshot);

  const hasMore = receivedTeachers.length > PAGE_SIZE;
  const teachers = receivedTeachers.slice(0, PAGE_SIZE);

  return {
    teachers,
    hasMore,
    lastKey: teachers.at(-1)?.id ?? null,
  };
}

export async function fetchAllTeachers() {
  const snapshot = await get(ref(database, "teachers"));

  return normalizeSnapshot(snapshot);
}
