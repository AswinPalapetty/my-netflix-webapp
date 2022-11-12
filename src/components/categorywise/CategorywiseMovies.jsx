import axios from '../../utilities/axios'
import React, { useContext, useEffect, useState } from 'react'
import { searchContext } from '../../contexts/searchContext'
import './Categorywise.css'
import { API_KEY, posterUrl } from '../../utilities/constants'
import { Col, Container, Row } from 'react-bootstrap'
import netflixPoster from '../../images/netflixPoster.jpg'

function CategorywiseMovies(props) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [content, setContent] = useState([])
  const { query, setQuery } = useContext(searchContext)

  //This UseEffect is used to detect the change in page
  useEffect(() => {

    if (query === '') {
      if (props.genreId) {
        axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=${props.genreId}&page=${page}`).then((response) => {
          setTotalPages(response.data.total_pages)
          setContent([...content, ...response.data.results])
        })
      }
    }

    else {

      if (query.indexOf(' ') !== -1) {
        setQuery(query.replace(/\s+/g, '+')) //Replace every space in the string with '+'
      }

      axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`).then((response) => {
        setTotalPages(response.data.total_pages)
        setContent([...content, ...response.data.results])
      })
    }

  }, [page])


  //This UseEffect is used to detect the change in query and props.genreId
  useEffect(() => {

    setPage(1)
    setContent([])

    if (query === '') {
      if (props.genreId) {
        axios.get(`/discover/movie?api_key=${API_KEY}&with_genres=${props.genreId}&page=${page}`).then((response) => {
          setTotalPages(response.data.total_pages)
          setContent(response.data.results)
        })
      }
    }

    else {

      if (query.indexOf(' ') !== -1) {
        setQuery(query.replace(/\s+/g, '+')) //Replace every space in the string with '+'
      }

      axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`).then((response) => {
        setTotalPages(response.data.total_pages)
        if (response.data.results.length !== 0) {
          setContent(response.data.results)
        }
        else {
          setContent([])
        }
      }).catch((err) => {
        setContent([])
        console.log('err==' + err);

      })
    }

  }, [query, props.genreId])



  window.onscroll = () => {
    if (page < totalPages && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      setPage(page + 1)
    }
  }

  return (
    <div>
      <Container fluid>
        <div className='categoryPosterRow mt-4'>
          <Row className='category-posters'>
            {content.map((object) => {
              let rating = Math.round(object.vote_average * 10) + '%'
              return (
                <Col md={2} sm={4} xs={6}>
                  <div className='poster-details mb-4'>
                    <img className='poster' alt={object.name || object.title} src={object.poster_path ? posterUrl + object.poster_path : netflixPoster} />
                    <div className="text-center">
                      <div className='posterName'>{object.name || object.title}</div>
                      <div className='stars-outer mb-2'>
                        <div className='stars-inner' style={{ 'width': `${rating}` }}></div>
                      </div>
                    </div>
                  </div>
                </Col>
              )
            }
            )}
          </Row>
        </div>

        {/* {notFound &&
          <Row>
            <Col xs={12} md={12}>
              <div className='not-found-div'>
                <h4>No Result Found.</h4>
                <button className='back-button' onClick={() => { window.location.reload(false) }}><i class="fa-solid fa-backward"></i> Back</button>
              </div>
            </Col>
          </Row>} */}

      </Container>

    </div>
  )
}

export default CategorywiseMovies
