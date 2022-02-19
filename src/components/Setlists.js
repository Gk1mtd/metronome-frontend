import React from "react";
import userIcon from "../assets/acc image.png";
import { Link } from "react-router-dom";
import useSetlistAPI from "../customHooks/setlist.api";

function Setlists() {
  const { setlist, createSetlist } = useSetlistAPI();


  return (
    <div className="Setlists">
      <Link to="/user">
        <img className="user-icon" src={userIcon} alt="user icon" />
      </Link>
      <h1>Setlists</h1>
      {/** prints setlists from user, gained from custom hook usesetlistapi */}
      {setlist.map((element) => (
        <p key={element._id}>{element.name}</p>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.target.name.value)
          createSetlist(event.target.name.value);
        }}
      >
        <button type="submit">+</button>
        <input name="name" placeholder="New Setlist Name"></input>
      </form>
    </div>
  );
}

export default Setlists;
