import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.webm"

function Home() {
  return (
    <div className='Home'>
      <h1>Home</h1>
      <video autoPlay={true} width={200} loop={true} src={logo} alt='logo2' />
      <br/>
      <Link to='/signup'>Signup</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Home;
