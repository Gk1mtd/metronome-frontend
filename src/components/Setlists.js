import React from "react";
import userIcon from "../assets/acc image.png";
import { Link } from "react-router-dom";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});

function Setlists() {
  const [setlists, setSetlists] = React.useState([]);

  /** creates a new setlist and calls getallSetlists for rerender again */
  async function createSetlist(newSetlist) {
    try {
      await api.post("/setlist/create-setlist", { name: newSetlist });
      getAllSetlists();
    } catch (error) {}
  }
  /** retrieves all setlists from the current user, sets the state for auto rerender */
  async function getAllSetlists() {
    try {
      const { data } = await api.get("setlist/getall-setlists");
      setSetlists(data);
    } catch (error) {}
  }

  React.useEffect(() => {
    getAllSetlists();
  }, [setlists.length]);

  return (
    <div className="Setlists">
      <Link to="/user">
        <img className="user-icon" src={userIcon} alt="user icon" />
      </Link>
      <h1>Setlists</h1>
      {/** prints setlists from user, gained from custom hook usesetlistapi */}
      {setlists.map((element) => (
        <Link key={element._id} to={`/setlist/${element._id}`}>
          <p key={element._id}>{element.name}</p>
        </Link>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createSetlist(event.target.name.value);
          event.target.name.value = "";
        }}
      >
        <button type="submit">+</button>
        <input name="name" placeholder="New Setlist Name"></input>
      </form>
    </div>
  );
}

export default Setlists;
