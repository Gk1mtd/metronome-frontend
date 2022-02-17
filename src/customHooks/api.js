import axios from 'axios';
import React from 'react';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

/** provides the app with MERN functionality */
function useAPI() {
  /** holds the error messages to rerender a component with the message */
  const [responseMessage, setResponseMessage] = React.useState();
  const navigateTo = useNavigate();

  const api = axios.create({
    baseURL: constants.baseUrl, //ATTENTION, for deployment use baseUrl for dev use baseUrl_local!!!
    withCredentials: true,
  });

  async function login(user) {
    try {
      // get response from API
      const { data } = await api.post('/login', user);
      /** saves user id from api response into local storage
       *  user id can be accessed for private routing
       *  router can recognise if user is logged in
       */
      localStorage.setItem('user', data.id);
      /** redirects to setlist, if axios request is succesfull */
      navigateTo('/setlists');
    } catch (error) {
      console.error(`Error occured while trying to post login to API ${error}`);
      // sets state with error message responding from API request
      setResponseMessage({ message: error.response.data.message });
    }
  }

  /** creates new user with api call */
  async function submitNewUser(newUser) {
    try {
      await api.post('/signup', newUser);
      navigateTo('/login');
    } catch (error) {
      setResponseMessage({ message: error.response.data.message });
      console.error(
        `Error occured while trying to submit User to API: ${error}`
      );
    }
  }

  /** logs out the user through api call */
  async function logout() {
    try {
      localStorage.clear();
      await api.post('/logout');
      navigateTo('/');
    } catch (error) {
      console.log(error);
      setResponseMessage({ message: error.response.data.message });
    }
  }

  /** deletes user through api call, calls logout to deletes localstorage and redirect to home */
  async function deleteUser() {
    try {
      console.log('start to delete');
      await api.delete('/deleteuser');
      console.log('user deleted, going to redirect');
      logout();
    } catch (error) {
      console.log(error);
      setResponseMessage({ message: error.response.data.message });
    }
  }

  return { submitNewUser, login, logout, deleteUser, responseMessage };
}

export default useAPI;
