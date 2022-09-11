import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Signin from './pages/Signin';
import Movies from './pages/Movies';
import { authContext } from './contexts/FirebaseContext';
import {getAuth,onAuthStateChanged} from 'firebase/auth'

function App() {

  const {user,setUser} = useContext(authContext)
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{

      if(user) {
        setUser(user)
        console.log(user);
      }
      else{
        setUser(null)
      }

    })
  },[])
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signin' element={user ? navigate('/') : <Signin />} /> 
        <Route path='viewAll/:category' element={<Movies />}/>
      </Routes>
    </div>
  );
}

export default App;
