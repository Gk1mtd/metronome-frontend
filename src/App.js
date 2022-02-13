import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Home />

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
