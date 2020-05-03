import Validator from 'validator';

const isEmpty = (value) => {
  value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
};

const validateRegister = (data) => {
  let errors = [];
  // Data to string
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';

  if (!Validator.isLength(data.username, { min: 2, max: 64 })) {
    errors.push({
      type: 'username',
      message: 'Name must be between 2 and 64 characters',
    });
  }

  if (Validator.isEmpty(data.username)) {
    errors.push({
      type: 'username',
      message: 'Username is required',
    });
  }

  if (Validator.isEmpty(data.email)) {
    errors.push({
      type: 'email',
      message: 'Email is required',
    });
  }

  if (!Validator.isEmail(data.email)) {
    errors.push({
      type: 'email',
      message: 'Invalid email',
    });
  }

  if (Validator.isEmpty(data.password)) {
    errors.push({
      type: 'password',
      message: 'Password is required',
    });
  }

  if (!Validator.isLength(data.password, { min: 6, max: 64 })) {
    errors.push({
      type: 'password',
      message: 'Password must be at least 6 characters',
    });
  }

  if (Validator.isEmpty(data.rePassword)) {
    errors.push({
      type: 'password',
      message: 'Confirm password is required',
    });
  }

  if (!Validator.equals(data.password, data.rePassword)) {
    errors.push({
      type: 'password',
      message: 'Passwords must match',
    });
  }

  return errors;
};

const validateLogin = (data) => {
  let errors = [];
  // Data to string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.push({
      type: 'email',
      message: 'Invalid email',
    });
  }

  if (Validator.isEmpty(data.email)) {
    errors.push({
      type: 'email',
      message: 'Email is required',
    });
  }

  if (Validator.isEmpty(data.password)) {
    errors.push({
      type: 'password',
      message: 'Password is required',
    });
  }

  return {
    errors,
  };
};

module.exports = {
  validateRegister,
  validateLogin,
};

/*const yup = require('yup');

const emailNotLongEnough = 'email must be at least 3 characters';
const nameNotLongEnough = 'name must be at least 3 characters';
const passwordNotLongEnough = 'password must be at least 8 characters';
const invalidEmail = 'email must be a valid email';

const validator = yup.object().shape({
  email: yup.string().min(3, emailNotLongEnough).max(100).email(invalidEmail),
  name: yup.string().min(3, nameNotLongEnough).max(100),
  password: yup.string().min(8, passwordNotLongEnough).max(100),
});

const formatYupError = (err) => {
  const errors = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });
  return errors;
};

module.exports = { validator, formatYupError };*/
