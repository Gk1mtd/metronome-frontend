import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

/** easy to import hardcoded paths, used across the whole project */
const { REACT_APP_API_URL } = process.env;

/** provides the app with MERN functionality */
function useSetlistAPI() {
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const { setlistId } = useParams();

  /** holds the error messages to rerender a component with the message */
  const [responseMessage, setResponseMessage] = React.useState();
  /** this state uses null, because Setlist Component tries otherwise
   * to access an empty array, which leads to errors */
  const [setlist, setSetlist] = React.useState({name: "", songs: []});
  const [setlists, setSetlists] = React.useState([]);

  /** creates a new setlist and calls getallSetlists for rerender again */
  async function createSetlist(newSetlist) {
    try {
      await api.post("/setlist/create-setlist", { name: newSetlist });
      getAllSetlists();
    } catch (error) {}
  }

  async function getSetlist() {
    try {
      const { data } = await api.get(`/setlist/get-setlist/${setlistId}`);
      setSetlist({...setlist, ...data});
    } catch (error) {}
  }

  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get("setlist/getall-setlists");
      setSetlists(data);
    } catch (error) {}
  }

  async function deleteSetlist(setlistId) {
    try {
      const { data } = await api.get(`/setlist/get-setlist/${setlistId}`);
      setSetlist(data);
    } catch (error) {}
  }

  return {
    getSetlist,
    getAllSetlists,
    createSetlist,
    responseMessage,
    setlists,
    setlist,
  };
}

export default useSetlistAPI;
