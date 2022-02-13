import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Setlists from './components/Setlists';
import Error from './components/Error';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setlists' element={<Setlists />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
