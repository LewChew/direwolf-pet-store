import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listDirewolfDetails,
  createDirewolfReview,
} from '../actions/direwolfActions';
import { DIREWOLF_CREATE_REVIEW_RESET } from '../constants/direwolfConstants';

const DirewolfScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const direwolfDetails = useSelector((state) => state.direwolfDetails);
  const { loading, error, direwolf } = direwolfDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const direwolfReviewCreate = useSelector((state) => state.direwolfReviewCreate);
  const {
    success: successDirewolfReview,
    loading: loadingDirewolfReview,
    error: errorDirewolfReview,
  } = direwolfReviewCreate;

  useEffect(() => {
    if (successDirewolfReview) {
      setRating(0);
      setComment('');
      dispatch({ type: DIREWOLF_CREATE_REVIEW_RESET });
    }

    dispatch(listDirewolfDetails(id));
  }, [dispatch, id, successDirewolfReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createDirewolfReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={direwolf.name} />
          <Row>
            <Col md={6}>
              <Image src={direwolf.image} alt={direwolf.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{direwolf.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={direwolf.rating}
                    text={`${direwolf.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${direwolf.price}</ListGroup.Item>
                <ListGroup.Item>
                  Breed: {direwolf.breed}
                </ListGroup.Item>
                <ListGroup.Item>
                  Size: {direwolf.size}
                </ListGroup.Item>
                <ListGroup.Item>
                  Age: {direwolf.age} years
                </ListGroup.Item>
                <ListGroup.Item>
                  Temperament: {direwolf.temperament}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {direwolf.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${direwolf.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {direwolf.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {direwolf.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(direwolf.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={direwolf.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {direwolf.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {direwolf.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successDirewolfReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingDirewolfReview && <Loader />}
                  {errorDirewolfReview && (
                    <Message variant='danger'>{errorDirewolfReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingDirewolfReview}
                        type='submit'
                        variant='primary'
                        className='my-3'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DirewolfScreen;
