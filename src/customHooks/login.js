import React from 'react';
import axios from 'axios';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

/** custom hook for login, returns the async function to login
 * and the state for conditional rendering in component
 *
 */
function useLogin() {
  /**used for redirection  */
  const navigateTo = useNavigate();
  const api = axios.create({ baseURL: constants.baseUrl });

  // hook/state to save error response from API request
  const [responseMessage, setResponseMessage] = React.useState();
  /** async login function */
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
  return { login, responseMessage };
}

export default useLogin;
