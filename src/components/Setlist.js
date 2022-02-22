import React from "react";
import { useParams, Link } from "react-router-dom";
import useSetlistAPI from "../customHooks/setlist.api";
import useSongAPI from "../customHooks/song.api";
function Setlist() {
  const { setlistId } = useParams();
  const { setlist, getSetlist, setSetlist } = useSetlistAPI();
  const { createSong } = useSongAPI();

  React.useEffect(() => {
    getSetlist(setlistId);
  }, []);

  return (
    <div>
      <h3>{setlist?.name}</h3>
      {setlist &&
        setlist.songs.map((song) => (
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
      <Link to={`/setlist/${setlistId}/song`}>+</Link>
      {/* {setlist && setlist?.songs.map((song) => <p>{song}</p>)} */}
    </div>
  );
}

export default Setlist;
