import { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import eyeOffIcon from "../../assets/eyeoff.svg";
import { useAuth } from "../../hooks/useAuth";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrors";
import Modal from "../Modal/Modal";
import css from "./AuthModal.module.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object({
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
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

function AuthModal({ isOpen, mode, onClose, onSwitch }) {
  const { login, register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(
    () => (mode === "register" ? registerSchema : loginSchema),
    [mode],
  );

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      name: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  }, [mode, isOpen, reset]);

  const isRegister = mode === "register";

  const onSubmit = async (values) => {
    try {
      if (isRegister) {
        await registerUser(values);
        toast.success("Registration successful");
      } else {
        await login(values);
        toast.success("Welcome back!");
      }

      onClose();
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={isRegister ? "Registration form" : "Login form"}
    >
      <h2 className={css.title}>{isRegister ? "Registration" : "Log In"}</h2>

      <p className={css.description}>
        {isRegister
          ? "Thank you for your interest in our platform! To register, provide the necessary information."
          : "Welcome back! Please enter your credentials to access your account and continue your search for a teacher."}
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {isRegister && (
          <label className={css.field}>
            <span className={css.visuallyHidden}>Name</span>

            <input
              className={`${css.input} ${errors.name ? css.inputError : ""}`}
              type="text"
              placeholder="Name"
              autoComplete="name"
              {...registerField("name")}
            />

            {errors.name && (
              <span className={css.error}>{errors.name.message}</span>
            )}
          </label>
        )}

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
          <span className={css.visuallyHidden}>Password</span>

          <span className={css.passwordWrapper}>
            <input
              className={`${css.input} ${
                errors.password ? css.inputError : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              {...registerField("password")}
            />

            <button
              className={css.passwordButton}
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              <img
                className={css.passwordIcon}
                src={eyeOffIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          </span>

          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </label>

        <button
          className={css.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : isRegister ? "Sign Up" : "Log In"}
        </button>
      </form>

      <button
        className={css.switchButton}
        type="button"
        onClick={() => onSwitch(isRegister ? "login" : "register")}
      >
        {isRegister
          ? "Already have an account? Log in"
          : "Don’t have an account? Register"}
      </button>
    </Modal>
  );
}

export default AuthModal;
