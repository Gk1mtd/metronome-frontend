import React from 'react';
import useAPI from '../customHooks/user.api';
import { Link } from 'react-router-dom';

/** provides logout and delteuser through custom hook api
 * shows currently logged in user
 */
function User() {
  const { logout, deleteUser } = useAPI();
  const email = localStorage.getItem('email');

  return (
    <div className='User'>
      <Link className='link-button' to='/setlists'>
        back to Setlists
      </Link>
      <p>Hello {email}</p>
      <button className='logout-button' onClick={logout}>
        logout
      </button>
      <button className='delete-button' onClick={deleteUser}>
        delete account
      </button>
    </div>
  );
}

export default User;
