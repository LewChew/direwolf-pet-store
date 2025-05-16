import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const DirewolfCard = ({ direwolf }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/direwolf/${direwolf._id}`}>
        <Card.Img src={direwolf.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/direwolf/${direwolf._id}`}>
          <Card.Title as='div'>
            <strong>{direwolf.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={direwolf.rating}
            text={`${direwolf.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='div' className='my-2'>
          <div>
            Size: {direwolf.size} | Age: {direwolf.age} years
          </div>
        </Card.Text>

        <Card.Text as='h3'>${direwolf.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DirewolfCard;
