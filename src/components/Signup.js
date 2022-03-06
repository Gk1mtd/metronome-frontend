import React from 'react';
import useAPI from '../customHooks/user.api';
import { Link } from 'react-router-dom';

/** uses api custom hook to sign up a new user */
function Signup() {
  const { submitNewUser, responseMessage } = useAPI();
  const [passwordsNotTheSameMessage, setPasswordsNotTheSameMessage] =
    React.useState(null);

  return (
    <div className='Signup'>
      <Link className='link-button' to={`/`}>
        back to start
      </Link>

      <h1>Signup</h1>
      {responseMessage && <p>{responseMessage.message}</p>}
      {passwordsNotTheSameMessage && (
        <p>{passwordsNotTheSameMessage.message}</p>
      )}
      <form
        onSubmit={event => {
          event.preventDefault();
          let passwordInput = event.target[1].value;
          let passwordConfirmation = event.target[2].value;
          if (passwordInput !== passwordConfirmation) {
            setPasswordsNotTheSameMessage({
              message: 'passwords do not match',
            });
          }
          setPasswordsNotTheSameMessage(null);

          const newUser = {
            email: event.target.email.value,
            password: event.target.password.value,
          };
          submitNewUser(newUser);
        }}
      >
        <label htmlFor='email'>Email</label>
        <input name='email' type='email'></input>
        <label htmlFor='password'>Password</label>
        <input name='password' type='password'></input>
        <label htmlFor='password-confirmation'>Confirm Password</label>
        <input name='password-confirmation' type='password'></input>
        <button type='submit'>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
