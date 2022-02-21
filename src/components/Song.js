import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSongAPI from "../customHooks/song.api";

function Song() {
  const { createSong, getSongById, song } = useSongAPI();
  const { setlistId, songId } = useParams();
  const navigateTo = useNavigate();
    console.log(song);
  // hole song von server
  // trage daten vom song in die form ein


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
          console.log("event target", event.target);
          createSong(body);
          navigateTo(`/setlists`);
        }}
      > 
      {/* try to set value from database as value of input field*/}
        <input value={song?.name || ''} name="name" placeholder="Song Name"></input>
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
      <button>Delete</button>
    </div>
  );
}

export default Song;
