import './App.css';
import Header from './components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Topic from './views/Topic';

function App() {
  return (
    <div>
      <Header />
      <div className='box'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/topic/:id/*' element={<Topic/>}></Route>
          <Route path='/user/:id/*' element={<Profile/>}></Route>
          <Route path='/topic'element={<Navigate to="/"></Navigate>}></Route>
          <Route path='/user' element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
