import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='Home'>
      <h1>Home</h1>
      <img src='https://metroknowme.netlify.app/logo512.png' alt='logo' />
      <Link to='/signup'>Signup</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Home;
