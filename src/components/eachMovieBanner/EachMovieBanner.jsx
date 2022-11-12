import axios from '../../utilities/axios'
import './EachMovieBanner.css'
import React from 'react'
import { useEffect } from 'react'
import { API_KEY, imageUrl } from '../../utilities/constants'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

function EachMovieBanner(props) {

  const [movie, setMovie] = useState()
  const [rating, setRating] = useState()
  useEffect(() => {
    axios.get(`movie/${props.id}?api_key=${API_KEY}&language=en-US`).then((response)=>{
      let movieData = response.data
      movieData.vote_average *= 10
      setRating(Math.round(movieData.vote_average)+'%')
      console.log(movieData);
      setMovie(movieData)
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  
  return (
    <div style={{backgroundImage : `url(${movie ? imageUrl + movie.backdrop_path : ""})`}} className='movie-banner mb-4'>
       <div className="movie-fade-left"></div>
       <Container fluid className='content'>
          <h1 className="movie-title">{movie ? movie.title || movie.name : ""}</h1>
          <div className="movie-stars-outer mb-2">
            <div className="movie-stars-inner" style={{'width' : `${rating}`}}></div>
          </div>
          <div className="movie-banner-buttons">
            <button className='movie-banner-button'>Play</button>
            <button className='movie-banner-button'>My list</button>
          </div>
          <p className='movie-description'>{movie ? movie.overview : ""}</p>
        </Container>
        <div className="movie-fade-bottom"></div>
    </div>
  )
}

export default EachMovieBanner