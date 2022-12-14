import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { posterUrl } from '../../utilities/constants'
import './Cast.css'

function Cast(props) {
  let cast = props.cast
  return (
    <Container fluid>
      <div className="mb-4">
        <h4>Cast</h4>
        <Row>
            {
                cast.map((person) => {
                  if(person.known_for_department === "Acting" && person.profile_path !== null){
                    
                    return(
                      <Col md={2} sm={4} xs={6}>
                        <div className='cast mt-4' onClick={()=>window.open('http://google.com/search?q='+person.original_name)}>
                          <img className='cast-image' src={posterUrl+person.profile_path} alt={person.original_name} width="100%" />
                          <div className='cast-name mt-1'>{person.original_name}</div>
                        </div>
                      </Col>
                    )
                  }
                  else{
                    return (null)
                  }
                })
            }
        </Row>
      </div>
    </Container>
  )
}

export default Cast