import React from 'react';
import userIcon from '../assets/acc image.png';
import { Link } from 'react-router-dom';
import useSetlistAPI from '../customHooks/setlist.api';

function Setlists() {
  const { setlists, createSetlist, getAllSetlists } = useSetlistAPI();

  React.useEffect(() => {
    getAllSetlists();
  }, [setlists.length]);

  return (
    <div className='Setlists'>
      <div className='user-icon'>
        <Link className='user-icon-link' to='/user'>
          <img src={userIcon} alt='user icon' />
        </Link>
      </div>

      <h1>Setlists</h1>
      {/** prints setlists from user, gained from custom hook usesetlistapi */}
      {setlists.map(element => (
        <Link
          key={element._id}
          className='list-item'
          to={`/setlist/${element._id}`}
        >
          {element.name}
        </Link>
      ))}
      <form
        onSubmit={event => {
          event.preventDefault();
          createSetlist(event.target.name.value);
          event.target.name.value = '';
        }}
      >
        <div className='add-item'>
          <input name='name' placeholder='New Setlist Name'></input>
          <button type='submit'>+</button>
        </div>
      </form>
    </div>
  );
}

export default Setlists;
