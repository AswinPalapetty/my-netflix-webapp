import React, { useEffect, useState } from 'react'
import axios from '../../utilities/axios'
import { posterUrl } from '../../utilities/constants'
import './RowPost.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import netflixPoster from '../../../src/images/netflixPoster.jpg'


function RowPost(props) {
    const [category, setCategoryResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(props.category).then((response) => {
            console.log(response.data);
            setCategoryResults(response.data.results);
        })
    }, [])

    return (
        <div>
            <Container fluid>
                <div className='posterRow mb-4'>
                    <div className="title mb-1">
                        <h2>{props.title}</h2>
                        <div className="my-auto view-all-btn" onClick={()=>navigate(`/viewAll/${props.url}`)}>View All</div>
                    </div>
                    <Row className='posters'>
                        {category.map((object) => {
                            let rating = Math.round(object.vote_average * 10) + '%'
                            return (
                                <Col md={2} sm={4} xs={6}>
                                    <div className='poster-details' onClick={() => navigate(`/movie/${object.id}`)}>
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
            </Container>

        </div>
    )
}

export default RowPost