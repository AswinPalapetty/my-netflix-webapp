import axios from '../../utilities/axios'
import React, { useContext, useEffect, useState } from 'react'
import './EachOriginalsBanner.css'
import { API_KEY, imageUrl } from '../../utilities/constants'
import signinBackground from '../../images/signinBackground.jpg'
import { Container } from 'react-bootstrap'
import { authContext } from '../../contexts/FirebaseContext'
import { collection, addDoc, getFirestore, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import { firebase } from '../../firebase/Config'
import { useNavigate } from 'react-router-dom'

function EachOriginalsBanner(props) {

  const [tv, setTv] = useState(null)
  const [rating, setRating] = useState()
  const [watchList, setWatchList] = useState(false)
  const [tvBanner, setTvBanner] = useState(null)
  const { user } = useContext(authContext)
  const db = getFirestore(firebase)
  const navigate = useNavigate();

  useEffect(() => {

    if (user) {
      const watchListRef = collection(db, "watchlist");
      const q = query(watchListRef, where("item_id", "==", `${props.id}`), where("genre", "==", "tv"), where("UID", "==", `${user.uid}`));

      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size) {
          console.log(true);
          setWatchList(true)
        }
      })

      console.log(watchList);
    }

    axios.get(`/tv/${props.id}?api_key=${API_KEY}&language=en-US`).then((response) => {
      let tvData = response.data;
      tvData.vote_average *= 10
      setRating(Math.round(tvData.vote_average) + '%')
      setTv(tvData)
      setTvBanner(tvData.backdrop_path)
    }).catch((error) => {
      console.log(error)
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
          genre: "tv",
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
    <div style={{ backgroundImage: `url(${tvBanner != null ? imageUrl + tvBanner : signinBackground})` }} className='tv-banner mb-4'>
      <div className="tv-fade-left"></div>
      <Container fluid className='content'>
        <h1 className="tv-title">{tv ? tv.title || tv.name : ""}</h1>
        <div className="tv-stars-outer mb-2">
          <div className="tv-stars-inner" style={{ 'width': `${rating}` }}></div>
        </div>
        <div className="tv-banner-buttons">
          <button className='tv-banner-button' onClick={() => window.open(tv.homepage)}>Play</button>
          <button className='tv-banner-button' onClick={addToWatchlist}>{watchList ? 'Remove from watchlist' : 'Add to watchlist'}</button>
        </div>
        <p className='tv-description'>{tv ? tv.overview : ""}</p>
      </Container>
      <div className="tv-fade-bottom"></div>

    </div>
  )
}

export default EachOriginalsBanner