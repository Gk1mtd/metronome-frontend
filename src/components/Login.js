import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../customHooks/login';

function Login() {
  const { login, responseMessage } = useLogin();

  /** if the user is not existent, then the client will invite to signup */
  function renderErrorParser() {
    switch (responseMessage?.message) {
      case 'User not found, please Signup':
        return (
          <p>
            User does not exist ...yet ;) please{' '}
            <Link to='/signup'>Signup</Link>
          </p>
        );
      default:
        return <p>{responseMessage?.message}</p>;
    }
  }

  return (
    <div className='Login'>
      Login
      {renderErrorParser()}
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
