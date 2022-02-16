import React from 'react';
import Login from './Login';

/** Private Route does have target component as child and
 * checks if user is in local storage */
function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');

  return user ? children : <Login />;
}

export default PrivateRoute;
