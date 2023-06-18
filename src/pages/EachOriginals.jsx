import React, { useContext, useEffect, useState } from 'react'
import axios from '../utilities/axios'
import { useParams } from 'react-router-dom'
import EachOriginalsBanner from '../components/eachOriginalsBanner/EachOriginalsBanner'
import { API_KEY } from '../utilities/constants'
import Seasons from '../components/seasons/Seasons'
import YtVideos from '../components/YtVideos/YtVideos'
import Cast from '../components/cast/Cast'
import Related from '../components/related/Related'
import Reviews from '../components/reviews/Reviews'
import Footer from '../components/footer/Footer'
import NavBar from '../components/navbar/NavBar'
import { searchContext } from '../contexts/searchContext'
import { watchlistContext } from '../contexts/watchlistContext'

function EachOriginals() {

  let params = useParams()
  const {setSearchBox} = useContext(searchContext)
  const {setWatchlist} = useContext(watchlistContext)
  const [seasons, setSeasons] = useState([])
  const [videoDetails,setVideoDetails] = useState(null)
  const [cast,setCast] = useState(null)
  const [related,setRelated] = useState(null)
  const [reviews,setReviews] = useState(null)

  useEffect(() => {

    setSearchBox(false)

    axios.get(`/tv/${params.id}?api_key=${API_KEY}&language=en-US`).then((response) => {
      setSeasons(response.data.seasons)

    }).catch((error) => {
      console.log(error)
    })


    axios.get(`tv/${params.id}/videos?api_key=${API_KEY}&language=en-US`).then(videos => {
      if (videos.data.results.length !== 0) {
        setVideoDetails(videos.data.results);
      }
      else {
        setVideoDetails(null);
      }
    }).catch(err => {
      setVideoDetails(null);
    })

    axios.get(`tv/${params.id}/credits?api_key=${API_KEY}&language=en-US`).then((result)=>{
      if(result.data.cast.length !== 0){
        setCast(result.data.cast)
      }
      else{
        setCast(null)
      }
    }).catch(error=>{
      console.log(error);
    })

    axios.get(`tv/${params.id}/similar?api_key=${API_KEY}&language=en-US&page=1`).then((movies)=>{
      
      if(movies.data.results.length !== 0){
        setRelated(movies.data.results)
      }
      else{
        setRelated(null)
      }

    }).catch((error)=>console.log(error))

    axios.get(`tv/${params.id}/reviews?api_key=${API_KEY}&language=en-US&page=1`).then((response)=>{
      
      if(response.data.results.length !== 0){
        setReviews(response.data.results)
      }

    })


  }, [])

  return (
    <div>
      <NavBar />
      <EachOriginalsBanner id={params.id} />
      {seasons && <Seasons seasons={seasons} />}
      {videoDetails && <YtVideos id={params.id} videoDetails={videoDetails}/>}
      {cast && <Cast cast={cast}/>}
      {related && <Related related={related} type="originals" />}
      {reviews && <Reviews reviews={reviews}/>}
      <Footer />
    </div>
  )
}

export default EachOriginals