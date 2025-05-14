import axios from 'axios'
import {
  PATIENT_PROFILE_REQUEST, PATIENT_PROFILE_SUCCESS, PATIENT_PROFILE_FAIL,
  PATIENT_UPDATE_REQUEST, PATIENT_UPDATE_SUCCESS, PATIENT_UPDATE_FAIL,
  PATIENT_CREATE_REQUEST, PATIENT_CREATE_SUCCESS, PATIENT_CREATE_FAIL,
  MEDICAL_HISTORY_UPDATE_REQUEST, MEDICAL_HISTORY_UPDATE_SUCCESS, MEDICAL_HISTORY_UPDATE_FAIL,
  EHR_UPDATE_REQUEST, EHR_UPDATE_SUCCESS, EHR_UPDATE_FAIL
} from '../constants/Patient.js'
import { USER_LOGIN_SUCCESS } from '../constants/User.js'

const api = import.meta.env.VITE_BACKEND_API_URL

export const getPatientProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_PROFILE_REQUEST })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      },
      withCredentials: true
    }

    const { data } = await axios.get(`${api}/patient/profile`, config)
    
    dispatch({
      type: PATIENT_PROFILE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PATIENT_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const updatePatientProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_UPDATE_REQUEST })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      },
      withCredentials: true
    }

    const { data } = await axios.put(`${api}/patient/profile`, profileData, config)
    
    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}

export const createPatientProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_CREATE_REQUEST })
    
    const { userLogin: { userInfo } } = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      },
      withCredentials: true
    }

    const { data } = await axios.post(`${api}/patient/profile`, profileData, config)
    
    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data
    })
    const { data: userProfile } = await axios.get(`${api}/user`, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userProfile
    })
    localStorage.setItem('userInfo', JSON.stringify(userProfile))

  } catch (error) {
    dispatch({
      type: PATIENT_CREATE_FAIL,
      payload: error.response?.data?.message || error.message
    })
  }
}
