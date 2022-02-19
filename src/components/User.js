import React from 'react';
import useAPI from '../customHooks/user.api';
import {Link} from 'react-router-dom'

/** provides logout and delteuser through custom hook api
 * shows currently logged in user
 */
function User() {
  const { logout, deleteUser } = useAPI();

  const email = localStorage.getItem('email');

  return (
    <div>
      <Link to='/setlists'>back to Setlists</Link>
      <p>local user is: </p> {email}
      <button onClick={logout}>logout</button>
      <button onClick={deleteUser}>delete account</button>
    </div>
  );
}

export default User;
