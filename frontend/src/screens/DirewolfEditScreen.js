import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listDirewolfDetails, updateDirewolf } from '../actions/direwolfActions';
import { DIREWOLF_UPDATE_RESET } from '../constants/direwolfConstants';

const DirewolfEditScreen = () => {
  const { id } = useParams();
  const direwolfId = id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState(0);
  const [temperament, setTemperament] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const direwolfDetails = useSelector((state) => state.direwolfDetails);
  const { loading, error, direwolf } = direwolfDetails;

  const direwolfUpdate = useSelector((state) => state.direwolfUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = direwolfUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DIREWOLF_UPDATE_RESET });
      navigate('/admin/direwolflist');
    } else {
      if (!direwolf.name || direwolf._id !== direwolfId) {
        dispatch(listDirewolfDetails(direwolfId));
      } else {
        setName(direwolf.name);
        setPrice(direwolf.price);
        setImage(direwolf.image);
        setBreed(direwolf.breed);
        setSize(direwolf.size);
        setAge(direwolf.age);
        setTemperament(direwolf.temperament);
        setCountInStock(direwolf.countInStock);
        setDescription(direwolf.description);
      }
    }
  }, [dispatch, navigate, direwolfId, direwolf, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDirewolf({
        _id: direwolfId,
        name,
        price,
        image,
        breed,
        size,
        age,
        temperament,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/direwolflist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Direwolf</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose File'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='breed'>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter breed'
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='size'>
              <Form.Label>Size</Form.Label>
              <Form.Control
                as='select'
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
                <option value='Giant'>Giant</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='temperament'>
              <Form.Label>Temperament</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter temperament'
                value={temperament}
                onChange={(e) => setTemperament(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default DirewolfEditScreen;
