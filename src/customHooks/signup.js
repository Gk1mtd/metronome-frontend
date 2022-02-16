import axios from 'axios';
import React from 'react';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

function useSignup() {
  // navigation
  const navigateTo = useNavigate();
  //axios
  const api = axios.create({ baseURL: constants.baseUrl });
  /** holds state of error message from server, for rerendering in Signup Component */
  const [responseMessage, setResponseMessage] = React.useState();
  /** signs up user, or delivers error message in an object (state hook) */
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
  return { submitNewUser, responseMessage };
}

export default useSignup;
