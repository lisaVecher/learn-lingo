const firebaseErrorMessages = {
  "auth/email-already-in-use": "A user with this email already exists.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/missing-password": "Enter your password.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/weak-password": "Password must contain at least 6 characters.",
};

export function getFirebaseErrorMessage(error) {
  return (
    firebaseErrorMessages[error?.code] ||
    "Something went wrong. Please try again."
  );
}
