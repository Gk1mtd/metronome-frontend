import React from "react";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function useSongAPI() {
  const api = axios.create({
    baseURL: REACT_APP_API_URL, //ATTENTION, for deployment use baseUrl for dev use baseUrl_local!!!
    withCredentials: true,
  });

  const [responseMessage, setResponseMessage] = React.useState();
  /** this state uses null, because Setlist Component tries otherwise
   * to access an empty array, which leads to errors */
  const [song, setSong] = React.useState(null);

  async function createSong(songBody) {
    try {
        console.log('createSong param songBody ', songBody)
      const { data } = await api.post("/song", songBody);
    } catch (error) {
      console.log("Something went wrong during song creation", error);
    }
  }
  async function getSongById(songId) {
    try {
      const { data } = await api.get(`/song/${songId}`);
      setSong(data);
    } catch (error) {
      console.log("Something went wrong during song retrieval", error);
    }
  }
  async function updateSong(updatedSong, songId) {
    try {
      await api.put("/song", { updatedSong, songId });
    } catch (error) {
      console.log("Something went wrong during song update", error);
    }
  }
  async function deleteSong(songId) {
    try {
      await api.delete(`/song`, {songId});
    } catch (error) {
      console.log("Something went wrong during song deletion", error);
    }
  }

  return {createSong, getSongById, song};
}

export default useSongAPI;
