import React from 'react'
import './Seasons.css'
import { Col, Container, Row } from 'react-bootstrap'
import { posterUrl } from '../../utilities/constants'
import netflixPoster from '../../images/netflixPoster.jpg'

function Seasons(props) {
  return (
    <div className='mb-4'>
        <Container fluid>
                <h4>Seasons</h4>
                <Row>
                    {
                        props.seasons.map((season) => {
                            return (
                                <Col md={2} sm={4} xs={6}>
                                    <div className='season-poster mt-4'>
                                        <img className='poster' alt={season.name || season.title} src={season.poster_path ? posterUrl + season.poster_path : netflixPoster} />
                                        <div className='name mt-1'>{season.name}</div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
    </div>
  )
}

export default Seasons