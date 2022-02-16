import React from 'react';
import User from './User';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');

  return !user ? children : <User />;
}
export default PrivateRoute;
