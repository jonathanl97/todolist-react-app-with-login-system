export const validateEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!value) {
    return "Please enter your email.";
  } else if (!emailRegex.test(value)) {
    return "Please enter a valid email.";
  } else if (value.length > 50) {
    return "Email cannot exceed 50 characters";
  }
  return "";
};

export const validatePassword = (value) => {
  if (!value) {
    return "Please enter a password.";
  } else if (value.length < 8) {
    return "Password must be at least 8 characters.";
  } else if (value.length > 50) {
    return "Password cannot exceed 50 characters.";
  }
  return "";
};
