import React, { useContext, useEffect, useState } from 'react'
import axios from '../../utilities/axios'
import { imageUrl,API_KEY } from '../../utilities/constants'
import { Trending } from '../../utilities/categoryUrls'

import './Banner.css'
import { Container } from 'react-bootstrap'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { authContext } from '../../contexts/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { firebase } from '../../firebase/Config'

function Banner() {
  const [movie, setMovie] = useState()
  const [rating,setRating] = useState('')
  const [watchList,setWatchList] = useState(null);
  const { user } = useContext(authContext)
  const db = getFirestore(firebase)
  const navigate = useNavigate();
  let movieId = null;

  const openMovie = (movieId)=>{
    axios.get(`movie/${movieId}?api_key=${API_KEY}&language=en-US`).then((response)=>{
      window.open(response.data.homepage)
    })
  }

  useEffect(() => {

    axios.get(Trending).then((response) => {
      let movieData = response.data.results
      movieId = movieData.id;
      movieData = movieData[Math.floor(Math.random() * movieData.length)];
      movieData.vote_average *= 10
      setRating(Math.round(movieData.vote_average)+'%')
      console.log(movieData);
      setMovie(movieData)
    })

    const watchListRef = collection(db, "watchlist");
    const q = query(watchListRef, where("item_id", "==", `${movieId}`), where("genre", "==", "tv"));

    getDocs(q).then((querySnapshot)=>{
      if(querySnapshot){
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setWatchList(doc.id);
        });
      }
    })

  }, [])

  const addToWatchlist = () => {
    if (user) {
      if (watchList) {
        deleteDoc(doc(db, "watchlist", `${watchList}`)).then((result) => {
          setWatchList(null)
        });
      }
      else {
        addDoc(collection(db, "watchlist"), {
          UID: user.uid,
          genre: movie.media_type,
          item_id: movie.id
        }).then((result) => {
          setWatchList(result._key.path.segments[1]);
        });
      }
    }
    else {
      navigate('/signin');
    }
  }

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }} className='banner mb-4'>
      <div className="fade-left"></div>
        <Container fluid className='content'>
          <h1 className='title'>{movie ? movie.title || movie.name : ""}</h1>
          <div className='stars-outer mb-2'>
            <div className='stars-inner' style={{'width' : `${rating}`}}></div>
          </div>
          <div className="banner_buttons">
            <button className='banner_button' onClick={()=>openMovie(movie.id)}>Play</button>
            <button className='banner_button' onClick={addToWatchlist}>{watchList ? 'Remove from watchlist' : 'Add to watchlist'}</button>
          </div>
          <p className='description'>{movie ? movie.overview : ""}</p>
        </Container>
        <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner
