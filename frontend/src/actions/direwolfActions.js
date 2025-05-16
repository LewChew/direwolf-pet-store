import axios from 'axios';
import {
  DIREWOLF_LIST_REQUEST,
  DIREWOLF_LIST_SUCCESS,
  DIREWOLF_LIST_FAIL,
  DIREWOLF_DETAILS_REQUEST,
  DIREWOLF_DETAILS_SUCCESS,
  DIREWOLF_DETAILS_FAIL,
  DIREWOLF_DELETE_REQUEST,
  DIREWOLF_DELETE_SUCCESS,
  DIREWOLF_DELETE_FAIL,
  DIREWOLF_CREATE_REQUEST,
  DIREWOLF_CREATE_SUCCESS,
  DIREWOLF_CREATE_FAIL,
  DIREWOLF_UPDATE_REQUEST,
  DIREWOLF_UPDATE_SUCCESS,
  DIREWOLF_UPDATE_FAIL,
  DIREWOLF_CREATE_REVIEW_REQUEST,
  DIREWOLF_CREATE_REVIEW_SUCCESS,
  DIREWOLF_CREATE_REVIEW_FAIL,
  DIREWOLF_TOP_REQUEST,
  DIREWOLF_TOP_SUCCESS,
  DIREWOLF_TOP_FAIL,
} from '../constants/direwolfConstants';
import { logout } from './userActions';

export const listDirewolves = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: DIREWOLF_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/direwolves?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: DIREWOLF_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIREWOLF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDirewolfDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DIREWOLF_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/direwolves/${id}`);

    dispatch({
      type: DIREWOLF_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIREWOLF_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDirewolf = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIREWOLF_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/direwolves/${id}`, config);

    dispatch({
      type: DIREWOLF_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DIREWOLF_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createDirewolf = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIREWOLF_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/direwolves`, {}, config);

    dispatch({
      type: DIREWOLF_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DIREWOLF_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateDirewolf = (direwolf) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIREWOLF_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/direwolves/${direwolf._id}`,
      direwolf,
      config
    );

    dispatch({
      type: DIREWOLF_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: DIREWOLF_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DIREWOLF_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createDirewolfReview = (direwolfId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DIREWOLF_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/direwolves/${direwolfId}/reviews`, review, config);

    dispatch({
      type: DIREWOLF_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DIREWOLF_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const listTopDirewolves = () => async (dispatch) => {
  try {
    dispatch({ type: DIREWOLF_TOP_REQUEST });

    const { data } = await axios.get(`/api/direwolves/top`);

    dispatch({
      type: DIREWOLF_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIREWOLF_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
