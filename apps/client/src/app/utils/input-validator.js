const specialChars =
  /^[^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?][^!@$%^*+=[\]{};:\\|<>?]*$/;
const emailRFC5322 =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const nameValidator = (name) => {
  if (name?.trim().length === 0) return 'Name must not be empty.';
  if (!specialChars.test(name?.trim())) {
    return 'Name must not contain special characters.';
  }
  return false;
};

export const emailValidator = (email) => {
  if (email?.trim().length === 0) return 'Email must not be empty.';
  if (!emailRFC5322.test(email?.trim())) return 'Please enter a valid email.';
  return false;
};

export const passwordValidator = (password) => {
  if (password?.trim().length === 0) return 'Password must not be empty.';
  if (!passwordRegex.test(password?.trim())) {
    return 'Please enter a valid password.';
  }
  return false;
};

export const confirmPasswordValidator = (password, confirmPassword) => {
  if (confirmPassword?.trim().length === 0) {
    return 'Please confirm your password.';
  }
  if (confirmPassword?.trim() !== password) {
    return 'The password confirmation does not match.';
  }
  return false;
};
