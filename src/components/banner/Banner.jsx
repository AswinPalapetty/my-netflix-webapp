import React, { useEffect, useState } from 'react'
import axios from '../../utilities/axios'
import { imageUrl } from '../../utilities/constants'
import { Trending } from '../../utilities/categoryUrls'
import './Banner.css'
import { Container } from 'react-bootstrap'

function Banner() {
  const [movie, setMovie] = useState()
  const [rating,setRating] = useState('')
  useEffect(() => {
    axios.get(Trending).then((response) => {
      let movieData = response.data.results
      movieData = movieData[Math.floor(Math.random() * movieData.length)];
      movieData.vote_average *= 10
      setRating(Math.round(movieData.vote_average)+'%')
      console.log(movieData);
      setMovie(movieData)
    })
  }, [])

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }} className='banner mb-4'>
      <div className="fade-left"></div>
        <Container fluid className='content'>
          <h1 className='title'>{movie ? movie.title || movie.name : ""}</h1>
          <div className='stars-outer mb-2'>
            <div className='stars-inner' style={{'width' : `${rating}`}}></div>
          </div>
          <div className="banner_buttons">
            <button className='banner_button'>Play</button>
            <button className='banner_button'>My list</button>
          </div>
          <p className='description'>{movie ? movie.overview : ""}</p>
        </Container>
        <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner
