import axios from 'axios';
import { constants } from '../constants';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const navigateTo = useNavigate();
  const api = axios.create({ baseURL: constants.baseUrl });

  async function login(user) {
    try {
      const { data } = await api.post('/login', user);
      localStorage.setItem('user', data.id);

      navigateTo('/setlists');
    } catch (error) {
      console.error(`Error occured while trying to post login to API ${error}`);
    }
  }
  return { login };
}

export default useLogin;
