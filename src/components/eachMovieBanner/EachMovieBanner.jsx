import axios from '../../utilities/axios'
import './EachMovieBanner.css'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { API_KEY, imageUrl } from '../../utilities/constants'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import signinBackground from '../../images/signinBackground.jpg'
import { collection, addDoc, getFirestore, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firebase } from '../../firebase/Config'
import { authContext } from '../../contexts/FirebaseContext'
import { useNavigate } from 'react-router-dom'

function EachMovieBanner(props) {

  const [movie, setMovie] = useState()
  const [movieBanner, setMovieBanner] = useState(null)
  const [rating, setRating] = useState()
  const [watchList, setWatchList] = useState(false)
  const { user } = useContext(authContext)
  const db = getFirestore(firebase)
  const navigate = useNavigate();

  useEffect(() => {

    if (user) {
      const watchListRef = collection(db, "watchlist");
      const q = query(watchListRef, where("item_id", "==", `${props.id}`), where("genre", "==", "movie"), where("UID", "==", `${user.uid}`));

      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size) {
          console.log(true);
          setWatchList(true)
        }
      })
    }

    axios.get(`movie/${props.id}?api_key=${API_KEY}&language=en-US`).then((response) => {
      let movieData = response.data
      movieData.vote_average *= 10
      setRating(Math.round(movieData.vote_average) + '%')
      console.log(movieData);
      setMovieBanner(movieData.backdrop_path)
      setMovie(movieData)
    }).catch((error) => {
      console.log(error);
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
          genre: "movie",
          item_id: props.id
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
    <div style={{ backgroundImage: `url(${movieBanner != null ? imageUrl + movieBanner : signinBackground})` }} className='movie-banner mb-4'>
      <div className="movie-fade-left"></div>
      <Container fluid className='content'>
        <h1 className="movie-title">{movie ? movie.title || movie.name : ""}</h1>
        <div className="movie-stars-outer mb-2">
          <div className="movie-stars-inner" style={{ 'width': `${rating}` }}></div>
        </div>
        <div className="movie-banner-buttons">
          <button className='movie-banner-button' onClick={() => window.open(movie.homepage)}>Play</button>
          <button className='movie-banner-button' onClick={addToWatchlist}>{watchList ? 'Remove from watchlist' : 'Add to watchlist'}</button>
        </div>
        <p className='movie-description'>{movie ? movie.overview : ""}</p>
      </Container>
      <div className="movie-fade-bottom"></div>
    </div>
  )
}

export default EachMovieBanner