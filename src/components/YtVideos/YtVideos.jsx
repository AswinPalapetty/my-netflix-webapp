import React, { useState } from 'react'
import { Container, Modal, Row } from 'react-bootstrap'
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
                {
                    videoDetails.map((video) => {
                        return (
                            <Row className='m-0'>
                                <div className="col-md-3">
                                    <img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} alt='thumbnail' onClick={() => viewVideo(video.key)} />
                                </div>
                            </Row>
                        )
                    })
                }
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