import React from 'react';
import useLogin from '../customHooks/login';

function Login() {
  const { login } = useLogin();

  return (
    <div className='Login'>
      Login
      <form
        onSubmit={event => {
          event.preventDefault();
          const user = {
            email: event.target.email.value,
            password: event.target.password.value,
          };
          login(user);
        }}
      >
        <label htmlFor='email'>
          Email:
          <input name='email' type='email'></input>
        </label>
        <label htmlFor='password'>
          Password:
          <input name='password' type='password'></input>
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
