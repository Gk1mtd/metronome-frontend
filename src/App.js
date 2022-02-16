import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Setlists from './components/Setlists';
import User from './components/User';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Link to='/user'>User</Link>

      {/** Private Routes */}
      <Routes>
        {/* add PrivateRoute Component to element property*/}
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
