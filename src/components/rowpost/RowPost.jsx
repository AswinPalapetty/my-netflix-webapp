import React, { useEffect, useState } from 'react'
import axios from '../../utilities/axios'
import { API_KEY, posterUrl } from '../../utilities/constants'
import './RowPost.css'
import { Container, Modal, Row, Col } from 'react-bootstrap'
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom'
import netflixPoster from '../../../src/images/netflixPoster.jpg'


function RowPost(props) {
    const [category, setCategoryResults] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [videoKey, setVideoKey] = useState('');
    const navigate = useNavigate();

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    };

    const viewVideo = (movieId) => {
        axios.get(`movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`).then(videos => {
            if (videos.data.results.length !== 0) {
                videos = videos.data.results;
                videos = videos[Math.floor(Math.random() * videos.length)];
                // console.log(videos);
                setVideoKey(videos.key)
                setModalShow(true)
            }
            else {
                alert('No video found')
            }
        }).catch(err => {
            alert('No video found')
        })
    }

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
                                    <div className='poster-details' onClick={() => viewVideo(object.id)}>
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

            <div className="video">
                <Modal videoid={videoKey} show={modalShow} onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <YouTube iframeClassName='youtube-video' videoId={videoKey} opts={opts} />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default RowPost