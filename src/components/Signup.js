import React from 'react';
import useSignup from '../customHooks/signup';

function Signup() {
  const { submitNewUser, responseMessage } = useSignup();

  return (
    <div className='Signup'>
      <h1>Signup</h1>
      {responseMessage && <p>{responseMessage.message}</p>}
      <form
        onSubmit={event => {
          event.preventDefault();
          const newUser = {
            email: event.target.email.value,
            password: event.target.password.value,
          };
          submitNewUser(newUser);
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
        <button type='submit'>Create new Account</button>
      </form>
    </div>
  );
}

export default Signup;
