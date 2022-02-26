import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.webm"

function Home() {
  return (
    <div className='Home'>
      <h1>Metro-Know-Me</h1>
      <video muted={true} autoPlay={true} loop={true} src={logo} alt='logo2' />
      <Link to='/signup'>Signup</Link>
      <br/>
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Home;
