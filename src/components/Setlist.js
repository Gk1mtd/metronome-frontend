import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function Setlist() {
  const api = axios.create({
    baseURL: REACT_APP_API_URL,
    withCredentials: true,
  });
  const [setlist, setSetlist] = React.useState();
  const { setlistId } = useParams();

  async function getSetlist() {
    try {
      const { data } = await api.get(`/setlist/get-setlist/${setlistId}`);
      console.log("in getsetlist", data);
      await setSetlist({ ...setlist, ...data });
    } catch (error) {}
  }

  async function createSong(songBody) {
    try {
      await api.post("/song", songBody);
      await getSetlist();
    } catch (error) {
      console.log("Something went wrong during song creation", error);
    }
  }

  React.useEffect(() => {
    console.log("in useeffect davor", setlist);
    getSetlist();
    console.log("in useeffect danach", setlist);
  }, [setlist?.songs?.length]);

  return (
    <div>
      <h3>{setlist?.name}</h3>
      {setlist?.songs?.map((song) => (
        <div className="song-card" key={song._id}>
          <img src="" alt="Playbutton" />
          <Link to={`/setlist/${setlistId}/song/${song._id}`}>
            <div className="song-card-body">
              <p>{song.name}</p>
              <p>{song.bpm} BPM</p>
            </div>
          </Link>
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
        <button type="submit">+</button>
        <input name="name" placeholder="New Song Name"></input>
      </form>
      {/* {setlist && setlist?.songs.map((song) => <p>{song}</p>)} */}
      <br />
      <button
        onClick={() => {
          // deleteSetlist(setlistId, songId);
          // navigateTo("/setlists");
        }}
      >
        Delete Setlist
      </button>
    </div>
  );
}

export default Setlist;
