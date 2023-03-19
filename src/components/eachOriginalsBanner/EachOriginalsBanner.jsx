import axios from '../../utilities/axios'
import React, { useEffect, useState } from 'react'
import './EachOriginalsBanner.css'
import { API_KEY, imageUrl } from '../../utilities/constants'
import signinBackground from '../../images/signinBackground.jpg'
import { Container } from 'react-bootstrap'

function EachOriginalsBanner(props) {

    const [tv, setTv] = useState(null)
    const [rating,setRating] = useState()
    const [tvBanner,setTvBanner] = useState(null)

    useEffect(() => {
        axios.get(`/tv/${props.id}?api_key=${API_KEY}&language=en-US`).then((response) =>{
            let tvData = response.data;
            tvData.vote_average *= 10
            setRating(Math.round(tvData.vote_average)+'%')
            setTv(tvData)
            setTvBanner(tvData.backdrop_path)
        }).catch((error) => {
            console.log(error)
        })
    },[])
  return (
    <div style={{backgroundImage : `url(${tvBanner != null ? imageUrl + tvBanner : signinBackground})`}} className='tv-banner mb-4'>
        <div className="tv-fade-left"></div>
        <Container fluid className='content'>
          <h1 className="tv-title">{tv ? tv.title || tv.name : ""}</h1>
          <div className="tv-stars-outer mb-2">
            <div className="tv-stars-inner" style={{'width' : `${rating}`}}></div>
          </div>
          <div className="tv-banner-buttons">
            <button className='tv-banner-button' onClick={()=>window.open(tv.homepage)}>Play</button>
            <button className='tv-banner-button'>Add to list</button>
          </div>
          <p className='tv-description'>{tv ? tv.overview : ""}</p>
        </Container>
        <div className="tv-fade-bottom"></div>

    </div>
  )
}

export default EachOriginalsBanner