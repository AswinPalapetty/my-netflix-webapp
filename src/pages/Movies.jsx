import React, { useContext, useState } from 'react'
import NavBar from '../components/navbar/NavBar'
import CategorywiseMovies from '../components/categorywise/CategorywiseMovies';
import CategorywiseTrending from '../components/categorywise/CategorywiseTrending';
import CategorywiseOriginals from '../components/categorywise/CategorywiseOriginals';
import CategorywisePopular from '../components/categorywise/CategorywisePopular';
import {useParams} from 'react-router-dom'
import { searchContext } from '../contexts/searchContext';
import axios from '../utilities/axios'
import { API_KEY } from '../utilities/constants';
import { useEffect } from 'react';

function Movies() {
    let params = useParams();
    const [genreId, setGenreId] = useState()
    const {setSearchBox} = useContext(searchContext)

    useEffect(()=>{

      setSearchBox(true)
      if(params.category !== 'trending' || params.category !== 'originals' || params.category !== 'popular'){
          axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response)=>{
            response.data.genres.forEach(object => {
              if(object.name === params.category.replace(/[\W_]+/g,' ')){
                setGenreId(object.id)
              }
            })
          })
      }

    },[])
    
  return (
    <div>
      <NavBar />
      {params.category === 'trending' ? <CategorywiseTrending category={params.category}/> : params.category === 'originals' ? <CategorywiseOriginals category={params.category}/> : params.category === 'popular' ? <CategorywisePopular category={params.category}/> : <CategorywiseMovies genreId={genreId} category={params.category}/>}
    </div>
  )
}

export default Movies
