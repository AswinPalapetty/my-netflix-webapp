import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { posterUrl } from '../../utilities/constants';
import './Reviews.css'
import userImage from '../../images/user.png'
import Badge from 'react-bootstrap/Badge';

function Reviews(props) {
  let reviews = props.reviews;

  return (
    <Container fluid>
      <div className="mb-4">
        <h4 className='mb-3'>User Reviews</h4>
        <Row>
          <div className="reviews">
            {
              reviews.map((eachReview) => {
                if (eachReview.author_details.avatar_path) {
                  if (eachReview.author_details.avatar_path.substring(0, 2) === '/h') {
                    eachReview.author_details.avatar_path = eachReview.author_details.avatar_path.substring(1, eachReview.author_details.avatar_path.length + 1)
                    console.log(eachReview.author_details.avatar_path);
                  }
                  else {
                    eachReview.author_details.avatar_path = posterUrl + eachReview.author_details.avatar_path
                  }
                }
                return (
                  <Col md={12} xs={12} sm={12}>
                    <div className="user-review mb-3">
                      <img className='user-image' src={eachReview.author_details.avatar_path ? eachReview.author_details.avatar_path : userImage} />
                      <div className="username">{eachReview.author_details.name !== "" ? eachReview.author_details.name : eachReview.author_details.username}</div>
                      <Badge pill bg="secondary" className='badge-color'>
                        <div className="star"></div>
                        <div className='rating-section'>{eachReview.author_details.rating}<div className="rating">/10</div></div>
                      </Badge>
                      <div className="review-content"><p>{eachReview.content}</p></div>
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

export default Reviews