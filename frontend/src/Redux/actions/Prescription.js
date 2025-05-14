import axios from 'axios';
import {
  PATIENT_PRESCRIPTIONS_REQUEST,
  PATIENT_PRESCRIPTIONS_SUCCESS,
  PATIENT_PRESCRIPTIONS_FAIL,
} from '../constants/Prescription.js';

const api = import.meta.env.VITE_BACKEND_API_URL

export const getPatientPrescriptions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_PRESCRIPTIONS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
      withCredentials: true
    };
    const { data } = await axios.get(`${api}/prescription/patient`, config);
    dispatch({ type: PATIENT_PRESCRIPTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_PRESCRIPTIONS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
