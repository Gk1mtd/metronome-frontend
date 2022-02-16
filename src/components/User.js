import React from 'react';
import axios from 'axios';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

function User() {
  const { user } = localStorage;
  console.log(localStorage);
  const navigateTo = useNavigate();

  async function logOut() {
    try {
      localStorage.clear();
      await axios.post(`${constants.baseUrl}/logout`);
      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteUser() {
    try {
      await axios.post(constants.baseUrl + '/delete-user');
      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
    logOut();
  }

  return (
    <div>
      User
      {localStorage.getItem('user')}
      <button onClick={logOut}>logout</button>
      <button onClick={deleteUser}>delete account</button>
    </div>
  );
}

export default User;
