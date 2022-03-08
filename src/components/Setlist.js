import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Metronome from "./Metronome";
import deleteButton from "../assets/delete button.png";
const { REACT_APP_API_URL } = process.env;

function Setlist() {
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const [setlist, setSetlist] = React.useState();
  const { setlistId } = useParams();
  const navigateTo = useNavigate();

  async function createSong(songBody) {
    try {
      await api.post("/song", songBody);
      getSetlist();
    } catch (error) {
      console.error("Something went wrong during song creation", error);
    }
  }
  async function getSetlist() {
    try {
      const { data } = await api.get(`/setlist/get-setlist/${setlistId}`);
      await setSetlist({ ...setlist, ...data });
    } catch (error) {}
  }
  async function deleteSetlist() {
    try {
      await api.delete(`/setlist/delete-setlist/${setlistId}`);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getSetlist();
  }, [setlist?.songs?.length]);

  return (
    <div className="Setlist">
      <Link className="link-button" to={`/setlists`}>
        back to Setlists
      </Link>
      <br />
      <div className="setlist-name">
        <h3>{setlist?.name}</h3>
        <img
          src={deleteButton}
          className="delete-button-round"
          onClick={() => {
            deleteSetlist();
            navigateTo("/setlists");
          }}
          alt="delete button"
        />
      </div>
      {setlist?.songs?.map((song) => (
        <div key={song._id}>
          <div className="song-card">
            <Metronome bpm={song.bpm} />
            <Link
              className="list-item"
              to={`/setlist/${setlistId}/song/${song._id}`}
            >
              <p>
                {song.name}
                <br />
                {song.bpm} BPM
              </p>
            </Link>
          </div>
          <hr />
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createSong({
            name: event.target.name.value,
            setlistId,
          });
          event.target.name.value = "";
        }}
      >
        <div className="add-item">
          <input name="name" placeholder="New Song Name"></input>
          <br />
          <button type="submit">+</button>
        </div>
      </form>
      {/* {setlist && setlist?.songs.map((song) => <p>{song}</p>)} */}
      <br />
    </div>
  );
}

export default Setlist;
