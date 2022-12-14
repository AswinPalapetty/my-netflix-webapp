import React, { useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import './YtVideos.css'
import YouTube from 'react-youtube';

function YtVideos(props) {

    const [modalShow, setModalShow] = useState(false);
    const [videoKey, setVideoKey] = useState('null');
    let videoDetails = props.videoDetails;

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    };

    const viewVideo = (key) => {
        setVideoKey(key)
        setModalShow(true)
    }


    return (
        <div>
            <Container fluid>
                <h4>Videos</h4>
                <Row>
                    {
                        videoDetails.map((video) => {
                            return (
                                <Col md={3} sm={6}>
                                    <div className='video-thumbnail'>
                                        <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt='thumbnail' width="100%" />
                                        <i class="fa-solid fa-circle-play" onClick={() => viewVideo(video.key)}></i>
                                        <div className='name mt-1'>{video.name}</div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
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

export default YtVideos