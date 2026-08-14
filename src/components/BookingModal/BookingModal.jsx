import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal/Modal";
import css from "./BookingModal.module.css";

const bookingSchema = yup.object({
  reason: yup.string().required("Choose a reason"),
  name: yup
    .string()
    .trim()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[+]?[0-9\s()-]{7,20}$/, "Enter a valid phone number")
    .required("Phone number is required"),
});

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

function BookingModal({ teacher, isOpen, onClose }) {
  const { user } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset({
      reason: "",
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
    });
  }, [isOpen, reset, user]);

  if (!teacher) {
    return null;
  }

  const fullName = `${teacher.name} ${teacher.surname}`;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success(`Trial lesson with ${fullName} has been requested`);

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={`Book a trial lesson with ${fullName}`}
      variant="booking"
    >
      <h2 className={css.title}>Book trial lesson</h2>

      <p className={css.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacher}>
        <img className={css.avatar} src={teacher.avatar_url} alt={fullName} />

        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>{fullName}</p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.radioGroup}>
            {reasons.map((reason) => (
              <label className={css.radioLabel} key={reason}>
                <input
                  className={css.radio}
                  type="radio"
                  value={reason}
                  {...registerField("reason")}
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>

          {errors.reason && (
            <span className={css.error}>{errors.reason.message}</span>
          )}
        </fieldset>

        <label className={css.field}>
          <span className={css.visuallyHidden}>Full name</span>

          <input
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            {...registerField("name")}
          />

          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </label>

        <label className={css.field}>
          <span className={css.visuallyHidden}>Email</span>

          <input
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...registerField("email")}
          />

          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>

        <label className={css.field}>
          <span className={css.visuallyHidden}>Phone number</span>

          <input
            className={`${css.input} ${errors.phone ? css.inputError : ""}`}
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            {...registerField("phone")}
          />

          {errors.phone && (
            <span className={css.error}>{errors.phone.message}</span>
          )}
        </label>

        <button
          className={css.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Book"}
        </button>
      </form>
    </Modal>
  );
}

export default BookingModal;
