import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import deleteButton from "../assets/delete button.png";
const { REACT_APP_API_URL } = process.env;

function Song() {
  const { songId, setlistId } = useParams();
  const [songData, setSongData] = React.useState({
    name: "noname",
    bpm: 30,
    note: "Nothing",
  });
  // const [inputTerm, setInputTerm] = React.useState({})
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const navigateTo = useNavigate();
  async function getSong(songId) {
    try {
      const { data } = await api.get(`/song/${songId}`);
      setSongData(data);
    } catch (error) {
      console.error("Something went wrong during song deletion", error);
    }
  }
  async function deleteSong(setlistId, songId) {
    try {
      await api.delete(`/setlist/${setlistId}/song/${songId}`);
    } catch (error) {
      console.error("Something went wrong during song deletion", error);
    }
  }

  async function updateSong() {
    try {
      await api.put(`/song`, { songData, songId });
    } catch (error) {
      console.error("Something went wrong during updating song", error);
    }
  }

  React.useEffect(() => {
    getSong(songId);
  }, []);

  function handleChange({ target }) {
    const { name, value } = target;
    setSongData({ ...songData, [name]: value });
  }
  return (
    <div className="Song">
      <Link className="link-button" to={`/setlist/${setlistId}`}>
        back to Setlist
      </Link>
      <br />
      <div className="setlist-name">
        <h3>{songData.name}</h3>
        <img
          src={deleteButton}
          className="delete-button-round"
          onClick={() => {
            deleteSong(setlistId, songId);
            navigateTo(-1);
          }}
          alt="delete button"
        />
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateSong();
          navigateTo(`/setlist/${setlistId}`);
        }}
      >
        {/* try to set value from database as value of input field*/}
        <input
          onChange={handleChange}
          name="name"
          placeholder="Song Name"
          value={songData.name}
        ></input>
        <br />
        <input
          onChange={handleChange}
          name="bpm"
          type="number"
          placeholder="BPM"
          value={songData.bpm}
        ></input>
        <br />
        <div className="song-buttons">
          <img
            className="plus-minus"
            src={minus}
            onClick={(event) => {
              setSongData({ ...songData, bpm: songData.bpm - 1 });
            }}
            alt="minus symbol"
          />
          <img
            className="plus-minus"
            src={plus}
            onClick={(event) => {
              console.log(event);
              setSongData({
                ...songData,
                bpm: Number(songData.bpm) + 1,
              });
            }}
            alt="plus symbol"
          />
        </div>
        <br />
        <textarea
          onChange={handleChange}
          name="note"
          placeholder="Notes"
          value={songData.note}
        ></textarea>
        <br />
        <button className="save-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default Song;
