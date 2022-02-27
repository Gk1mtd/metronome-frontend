import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Setlists from './components/Setlists';
import Song from './components/Song';
import User from './components/User';
import Metronome from './components/Metronome';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';
import Setlist from './components/Setlist';
import PublicRoute from './components/PublicRoute';
import { Routes, Route } from 'react-router-dom';

import React from 'react';

function App() {
  return (
    <div className='App'>
      {/** Private Routes */}
      <Routes>
        {/* add PrivateRoute Component to element property*/}
        <Route
          path='/metronome'
          element={
            <PrivateRoute>
              <Metronome />
            </PrivateRoute>
          }
        />
        <Route
          path='/user'
          element={
            /** Private Route does have target component as child and 
            checks if user is in local storage, returns target component*/
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path='/setlists'
          element={
            <PrivateRoute>
              <Setlists />
            </PrivateRoute>
          }
        />
        <Route
          path='/setlist/:setlistId'
          element={
            <PrivateRoute>
              <Setlist />
            </PrivateRoute>
          }
        />
        <Route
          path='/setlist/:setlistId/song'
          element={
            <PrivateRoute>
              <Song />
            </PrivateRoute>
          }
        />
        <Route
          path='/setlist/:setlistId/song/:songId'
          element={
            <PrivateRoute>
              <Song />
            </PrivateRoute>
          }
        />

        {/** Public Routes - only for not users */}
        <Route
          exact
          path='/'
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
