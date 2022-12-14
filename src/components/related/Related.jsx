import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { posterUrl } from '../../utilities/constants'
import netflixPoster from '../../../src/images/netflixPoster.jpg'
import './Related.css'
import { useNavigate } from 'react-router-dom'

function Related(props) {
    let related = props.related;
    const navigate = useNavigate();

  return (
    <Container fluid>
        <div className="mb-4">
            <h4>More like this</h4>
            <Row>
                {
                    related.map((movie)=>{
                        let rating = Math.round(movie.vote_average * 10) + '%'
                        return (
                            <Col md={2} sm={4} xs={6}>
                                <div className='poster-details' onClick={() => navigate(`/movie/${movie.id}`)}>
                                        <img className='poster' alt={movie.name || movie.title} src={movie.poster_path ? posterUrl + movie.poster_path : netflixPoster} />
                                        <div className="text-center">
                                            <div className='posterName'>{movie.name || movie.title}</div>
                                            <div className='stars-outer mb-2'>
                                                <div className='stars-inner' style={{ 'width': `${rating}` }}></div>
                                            </div>
                                        </div>
                                    </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    </Container>

  )
}

export default Related