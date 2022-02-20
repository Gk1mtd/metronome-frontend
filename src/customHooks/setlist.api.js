import axios from "axios";
import React from "react";
// import { useNavigate } from "react-router-dom";
/**
 * easy to import hardcoded paths, used across the whole project
 */
const { REACT_APP_API_URL } = process.env;

/** provides the app with MERN functionality */
function useSetlistAPI() {
  /** holds the error messages to rerender a component with the message */

  const [responseMessage, setResponseMessage] = React.useState();
  const [setlist, setSetlist] = React.useState([]);
  // const navigateTo = useNavigate();

  const api = axios.create({
    baseURL: REACT_APP_API_URL, //ATTENTION, for deployment use baseUrl for dev use baseUrl_local!!!
    withCredentials: true,
  });

  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get("setlist/getall-setlists");
      setSetlist(data);
    } catch (error) {}
  }

  /** creates a new setlist and calls getallSetlists for rerender again */
  async function createSetlist(newSetlist) {
    try {
      await api.post("/setlist/create-setlist", { name: newSetlist });
      getAllSetlists();
    } catch (error) {}
  }

  async function getSetlist(setlistId) {
    try {
      const { data } = await api.get(`/setlist/get-setlist/${setlistId}`);
      setSetlist(data);
    } catch (error) {}
  }

  /** gets all setlists at initial rendering */
  React.useEffect(() => {
    getAllSetlists();
  }, []);

  return {
    getSetlist,
    getAllSetlists,
    createSetlist,
    responseMessage,
    setlist,
  };
}

export default useSetlistAPI;
