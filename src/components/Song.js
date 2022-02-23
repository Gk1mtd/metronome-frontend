import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function Song() {
  const { songId, setlistId } = useParams();
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });

  const navigateTo = useNavigate();
  async function deleteSong(setlistId, songId) {
    try {
      await api.delete(`/setlist/${setlistId}/song/${songId}`);
    } catch (error) {
      console.log("Something went wrong during song deletion", error);
    }
  }

  return (
    <div>
      Song
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const body = {
            name: event.target.name.value,
            bpm: event.target.bpm.value,
            notes: event.target.notes.value,
            setlistId,
          };
          navigateTo(`/setlist/${setlistId}`);
        }}
      >
        {/* try to set value from database as value of input field*/}
        <input name="name" placeholder="Song Name"></input>
        <br />
        <input name="bpm" type="number" placeholder="BPM"></input>
        <br />
        <button>-</button>
        <button>+</button>
        <br />
        <textarea name="notes" placeholder="Notes"></textarea>
        <br />
        <button type="submit">Save</button>
      </form>
      <button
        onClick={() => {
          deleteSong(setlistId, songId);
          navigateTo(-1);
          // navigateTo(`/setlists`);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Song;
