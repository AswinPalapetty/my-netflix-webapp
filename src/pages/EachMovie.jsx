import axios from '../../src/utilities/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EachMovieBanner from '../components/eachMovieBanner/EachMovieBanner'
import YtVideos from '../components/YtVideos/YtVideos'
import { API_KEY } from '../utilities/constants'

function EachMovie() {
  let params = useParams()
  const [videoDetails, setVideoDetails] = useState(null)

  useEffect(() => {
    axios.get(`movie/${params.id}/videos?api_key=${API_KEY}&language=en-US`).then(videos => {
      if (videos.data.results.length !== 0) {
        setVideoDetails(videos.data.results);
        console.log(videos);
      }
      else {
        setVideoDetails(null);
      }
    }).catch(err => {
      setVideoDetails(null);
    })
  }, [])

  return (
    <div>
      <EachMovieBanner id={params.id} />
      {videoDetails && <YtVideos id={params.id} videoDetails={videoDetails}/>}
    </div>
  )
}

export default EachMovie