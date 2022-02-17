import React from 'react';
import useAPI from '../customHooks/api';

/** provides logout and delteuser through custom hook api
 * shows currently logged in user
 */
function User() {
  const { logout, deleteUser } = useAPI();

  const user = localStorage.getItem('user');

  return (
    <div>
      User
      {<p>local user is: {user}</p>}
      <button onClick={logout}>logout</button>
      <button onClick={deleteUser}>delete account</button>
    </div>
  );
}

export default User;
