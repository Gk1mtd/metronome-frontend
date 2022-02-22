import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSongAPI from "../customHooks/song.api";

function Song() {
  const { createSong, getSongById, deleteSong, song } = useSongAPI();
  const { setlistId, songId } = useParams();
  const navigateTo = useNavigate();

  React.useEffect(() => {
    getSongById(songId);
  }, []);

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
          createSong(body);
          navigateTo(`/setlists`);
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
          navigateTo("/setlists");
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Song;
