import axios from 'axios';
import {
  DOCTOR_PUBLIC_LIST_REQUEST,
  DOCTOR_PUBLIC_LIST_SUCCESS,
  DOCTOR_PUBLIC_LIST_FAIL,
} from '../constants/DoctorPublic.js';

const api = import.meta.env.VITE_BACKEND_API_URL

export const listDoctors = (search = '', page = 1, limit = 30) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_PUBLIC_LIST_REQUEST });
    const { data } = await axios.get(
      `${api}/public/doctors?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      );
    dispatch({ type: DOCTOR_PUBLIC_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_PUBLIC_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
