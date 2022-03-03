import React from 'react';
import { Link } from 'react-router-dom';
import useAPI from '../customHooks/user.api';

function Login() {
  const { login, responseMessage } = useAPI();

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
      <Link className='link-button' to={`/`}>
        back to start
      </Link>
      <h1>Login</h1>
      {responseMessage?.message && renderErrorParser()}
      {/**parses the error message from api hook to show the right message */}
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
        <label htmlFor='email'>Email:</label>
        <input name='email' type='email'></input>
        <label htmlFor='password'>Password:</label>
        <input name='password' type='password'></input>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
