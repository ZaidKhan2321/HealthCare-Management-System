import axios from 'axios';
import {
  DOCTOR_PROFILE_CREATE_REQUEST,
  DOCTOR_PROFILE_CREATE_SUCCESS,
  DOCTOR_PROFILE_CREATE_FAIL,
  DOCTOR_PROFILE_REQUEST,
  DOCTOR_PROFILE_SUCCESS,
  DOCTOR_PROFILE_FAIL,
  DOCTOR_PROFILE_UPDATE_REQUEST,
  DOCTOR_PROFILE_UPDATE_SUCCESS,
  DOCTOR_PROFILE_UPDATE_FAIL,
} from '../constants/Doctor.js';

const api = import.meta.env.VITE_BACKEND_API_URL

export const getDoctorProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_PROFILE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
      withCredentials: true
    };
    const { data } = await axios.get(`${api}/doctor/profile`, config);
    dispatch({ type: DOCTOR_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateDoctorProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_PROFILE_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo?.token}` },
      withCredentials: true
    };
    const { data } = await axios.put(`${api}/doctor/profile`, profileData, config);
    dispatch({ type: DOCTOR_PROFILE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_PROFILE_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const createDoctorProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_PROFILE_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
      withCredentials: true
    };

    const { data } = await axios.post(`${api}/doctor/profile`, profileData, config);

    dispatch({ type: DOCTOR_PROFILE_CREATE_SUCCESS, payload: data });

    const { data: userProfile } = await axios.get(`${api}/user`, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userProfile
    })
    localStorage.setItem('userInfo', JSON.stringify(userProfile))
  } catch (error) {
    dispatch({
      type: DOCTOR_PROFILE_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
