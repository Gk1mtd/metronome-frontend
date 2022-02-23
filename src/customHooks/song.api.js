import React from "react";
import axios from "axios";
import useSetlistAPI from "../customHooks/setlist.api";
const { REACT_APP_API_URL } = process.env;

function useSongAPI() {
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const [responseMessage, setResponseMessage] = React.useState();
  /** this state uses null, because Setlist Component tries otherwise
   * to access an empty array, which leads to errors */
  const [song, setSong] = React.useState(null);
  const [songs, setSongs] = React.useState(null);

  // api functions
  async function getSongById(songId) {
    try {
      const { data } = await api.get(`/song/${songId}`);
      setSong(data);
    } catch (error) {
      console.error("Something went wrong during song retrieval", error);
    }
  }

  async function updateSong(updatedSong, songId) {
    try {
      await api.put("/song", { updatedSong, songId });
    } catch (error) {
      console.error("Something went wrong during song update", error);
    }
  }
  
  async function deleteSong(setlistId, songId) {
    try {
      await api.delete(`/setlist/${setlistId}/song/${songId}`);
    } catch (error) {
      console.error("Something went wrong during song deletion", error);
    }
  }

  return { getSongById, deleteSong, song, songs };
}

export default useSongAPI;
