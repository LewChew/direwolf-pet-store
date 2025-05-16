import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import DirewolfCard from '../components/DirewolfCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listDirewolves } from '../actions/direwolfActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const direwolfList = useSelector((state) => state.direwolfList);
  const { loading, error, direwolves, page, pages } = direwolfList;

  useEffect(() => {
    dispatch(listDirewolves(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword && (
        <Link to='/' className='btn btn-dark my-3'>
          Go Back
        </Link>
      )}
      <h1>Latest Direwolves</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {direwolves.map((direwolf) => (
              <Col key={direwolf._id} sm={12} md={6} lg={4} xl={3}>
                <DirewolfCard direwolf={direwolf} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
