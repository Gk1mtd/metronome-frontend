import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
/**
 * easy to import hardcoded paths, used across the whole project
 */
const { REACT_APP_API_URL } = process.env;

/** provides the app with MERN functionality */
function useSetlistAPI() {
  /** holds the error messages to rerender a component with the message */

  const [responseMessage, setResponseMessage] = React.useState();
  const navigateTo = useNavigate();

  const api = axios.create({
    baseURL: REACT_APP_API_URL, //ATTENTION, for deployment use baseUrl for dev use baseUrl_local!!!
    withCredentials: true,
  });

  const [setlist, setSetlist] = React.useState([]);

  async function getAllSetlists() {
    try {
      const { data } = await api.get("setlist/getall-setlists");
      setSetlist(data);
    } catch (error) {}
  }

  React.useEffect(() => {
    getAllSetlists();
  }, []);

  return { getAllSetlists, responseMessage, setlist };
}

export default useSetlistAPI;
