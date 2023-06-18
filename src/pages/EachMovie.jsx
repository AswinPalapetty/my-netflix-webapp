import axios from '../../src/utilities/axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EachMovieBanner from '../components/eachMovieBanner/EachMovieBanner'
import YtVideos from '../components/YtVideos/YtVideos'
import { API_KEY } from '../utilities/constants'
import {searchContext} from '../contexts/searchContext'
import Cast from '../components/cast/Cast'
import NavBar from '../components/navbar/NavBar'
import Related from '../components/related/Related'
import Reviews from '../components/reviews/Reviews'
import Footer from '../components/footer/Footer'
import { watchlistContext } from '../contexts/watchlistContext'

function EachMovie() {
  let params = useParams()
  const {setSearchBox} = useContext(searchContext);
  const {setWatchlist} = useContext(watchlistContext);
  const [videoDetails, setVideoDetails] = useState(null)
  const [cast, setCast] = useState(null)
  const [related,setRelated] = useState(null)
  const [reviews,setReviews] = useState(null)

  useEffect(() => {

    setSearchBox(false)
    setWatchlist(true)
    
    axios.get(`movie/${params.id}/videos?api_key=${API_KEY}&language=en-US`).then(videos => {
      if (videos.data.results.length !== 0) {
        setVideoDetails(videos.data.results);
      }
      else {
        setVideoDetails(null);
      }
    }).catch(err => {
      setVideoDetails(null);
    })

    axios.get(`movie/${params.id}/credits?api_key=${API_KEY}&language=en-US`).then((result)=>{
      if(result.data.cast.length !== 0){
        setCast(result.data.cast)
      }
      else{
        setCast(null)
      }
    }).catch(error=>{
      console.log(error);
    })

    axios.get(`movie/${params.id}/similar?api_key=${API_KEY}&language=en-US&page=1`).then((movies)=>{
      
      if(movies.data.results.length !== 0){
        setRelated(movies.data.results)
        console.log(movies.data.results);
      }
      else{
        setRelated(null)
      }

    }).catch((error)=>console.log(error))

    axios.get(`movie/${params.id}/reviews?api_key=${API_KEY}&language=en-US&page=1`).then((response)=>{
      
      if(response.data.results.length !== 0){
        console.log(response);
        setReviews(response.data.results)
      }

    })

  }, [])



  return (
    <div>
      <NavBar />
      <EachMovieBanner id={params.id} />
      {videoDetails && <YtVideos id={params.id} videoDetails={videoDetails}/>}
      {cast && <Cast cast={cast}/>}
      {related && <Related related={related} type="movie"/>}
      {reviews && <Reviews reviews={reviews}/>}
      <Footer />
    </div>
  )
}

export default EachMovie