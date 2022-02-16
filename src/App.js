import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Setlists from './components/Setlists';
import User from './components/User';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';
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
            checks if user is in local storage */
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />

        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/setlists'
          element={
            <PrivateRoute>
              <Setlists />
            </PrivateRoute>
          }
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
