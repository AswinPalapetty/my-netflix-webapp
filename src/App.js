import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Signin from './pages/Signin';
import Movies from './pages/Movies';
import EachMovie from './pages/EachMovie'
import { authContext } from './contexts/FirebaseContext';
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import EachOriginals from './pages/EachOriginals';
import Wishlist from './components/wishlist/Wishlist';

function App() {

  const {user,setUser} = useContext(authContext)
  const auth = getAuth();

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
        <Route path='signin' element={user ? <Home /> : <Signin />} /> 
        <Route path='viewAll/:category' element={<Movies />}/>
        <Route path='movie/:id' element={<EachMovie />} />
        <Route path='originals/:id' element={<EachOriginals />} />
        <Route path='watchlist' element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
