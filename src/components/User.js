import React from 'react';

function User() {
  const { user } = localStorage;
  console.log(localStorage);
  return (
    <div>
      User
      {localStorage.getItem('user')}
    </div>
  );
}

export default User;
