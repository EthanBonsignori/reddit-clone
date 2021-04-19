import { UsernamePasswordInput } from './UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Please enter a valid email address',
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'Username must be 3 or more characters',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username cannot include symbols',
      },
    ];
  }

  if (options.password.length < 5) {
    return [
      {
        field: 'password',
        message: 'Password must be 5 or more characters',
      },
    ];
  }

  if (options.password !== options.passwordRepeat) {
    return [
      {
        field: 'password',
        message: 'Passwords must match',
      },
    ];
  }

  return null;
};
