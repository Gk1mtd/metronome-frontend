import React from 'react';
import axios from 'axios';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: constants.baseUrl,
  withCredentials: true,
});

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
      console.log('start to delete');
      await api.delete('/deleteuser', { headers: { user } });
      console.log('user deleted, going to redirect');
      navigateTo('/');
      //   logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      User
      {<p>local user is: {user}</p>}
      <button onClick={logOut}>logout</button>
      <button onClick={deleteUser}>delete account</button>
    </div>
  );
}

export default User;
