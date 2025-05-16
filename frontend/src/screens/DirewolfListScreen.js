import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listDirewolves,
  deleteDirewolf,
  createDirewolf,
} from '../actions/direwolfActions';
import { DIREWOLF_CREATE_RESET } from '../constants/direwolfConstants';
import { useNavigate, useParams } from 'react-router-dom';

const DirewolfListScreen = () => {
  const { pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const direwolfList = useSelector((state) => state.direwolfList);
  const { loading, error, direwolves, page, pages } = direwolfList;

  const direwolfDelete = useSelector((state) => state.direwolfDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = direwolfDelete;

  const direwolfCreate = useSelector((state) => state.direwolfCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    direwolf: createdDirewolf,
  } = direwolfCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: DIREWOLF_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/direwolf/${createdDirewolf._id}/edit`);
    } else {
      dispatch(listDirewolves('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdDirewolf,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteDirewolf(id));
    }
  };

  const createDirewolfHandler = () => {
    dispatch(createDirewolf());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Direwolves</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createDirewolfHandler}>
            <i className='fas fa-plus'></i> Create Direwolf
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>BREED</th>
                <th>SIZE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {direwolves.map((direwolf) => (
                <tr key={direwolf._id}>
                  <td>{direwolf._id}</td>
                  <td>{direwolf.name}</td>
                  <td>${direwolf.price}</td>
                  <td>{direwolf.breed}</td>
                  <td>{direwolf.size}</td>
                  <td>
                    <LinkContainer to={`/admin/direwolf/${direwolf._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(direwolf._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default DirewolfListScreen;
