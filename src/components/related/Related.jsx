import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { posterUrl } from '../../utilities/constants'
import netflixPoster from '../../../src/images/netflixPoster.jpg'
import './Related.css'
import { useNavigate } from 'react-router-dom'

function Related(props) {
    let related = props.related;
    const navigate = useNavigate();

    const gotToRelated = (id)=>{
        if(props.type === "movie"){
            navigate(`/movie/${id}`)
            window.location.reload()
        }
        else{
            navigate(`/originals/${id}`)
            window.location.reload()
        }

    }

    window.onpopstate = (e) =>{
        window.location.reload().then(()=>{
            window.scrollTo(0,0)
        })
    }
    

    return (
        <Container fluid>
            <div className="mb-4">
                <h4>More like this</h4>
                <Row>
                    <div className="related-posters">
                        {
                            related.map((movie) => {
                                let rating = Math.round(movie.vote_average * 10) + '%'
                                return (
                                    <Col md={2} sm={4} xs={6}>
                                        <div className='related-poster-details' onClick={() => gotToRelated(movie.id)}>
                                            <img className='related-poster' alt={movie.name || movie.title} src={movie.poster_path ? posterUrl + movie.poster_path : netflixPoster} />
                                            <div className="text-center">
                                                <div className='related-posterName'>{movie.name || movie.title}</div>
                                                <div className='related-stars-outer mb-2'>
                                                    <div className='related-stars-inner' style={{ 'width': `${rating}` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </div>
                </Row>
            </div>
        </Container>

    )
}

export default Related