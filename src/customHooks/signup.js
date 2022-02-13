import axios from 'axios';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

function useSignup() {
  // navigation
  const navigateTo = useNavigate();
  //axios
  const api = axios.create({ baseURL: constants.baseUrl });
  async function submitNewUser(newUser) {
    try {
      await api.post('/signup', newUser);
      navigateTo('/login');
    } catch (error) {
      console.error(
        `Error occured while trying to submit User to API: ${error}`
      );
    }
  }
  return { submitNewUser };
}

export default useSignup;
