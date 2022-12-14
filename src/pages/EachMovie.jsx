import axios from '../../src/utilities/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EachMovieBanner from '../components/eachMovieBanner/EachMovieBanner'
import YtVideos from '../components/YtVideos/YtVideos'
import { API_KEY } from '../utilities/constants'
import Cast from '../components/cast/Cast'
import Related from '../components/related/Related'

function EachMovie() {
  let params = useParams()
  const [videoDetails, setVideoDetails] = useState(null)
  const [cast, setCast] = useState(null)
  const [related,setRelated] = useState(null)

  useEffect(() => {
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
      if(cast !== 0){
        setCast(result.data.cast)
      }
      else{
        setCast(null)
      }
    }).catch(error=>{
      console.log(error);
    })

    axios.get(`movie/${params.id}/similar?api_key=${API_KEY}&language=en-US&page=1`).then((movies)=>{
      
      if(movies.result !== 0){
        setRelated(movies.data.results)
        console.log(movies.data.results);
      }
      else{
        setRelated(null)
      }

    }).catch((error)=>console.log(error))

  }, [])

  return (
    <div>
      <EachMovieBanner id={params.id} />
      {videoDetails && <YtVideos id={params.id} videoDetails={videoDetails}/>}
      {cast && <Cast cast={cast}/>}
      {related && <Related related={related}/>}
    </div>
  )
}

export default EachMovie