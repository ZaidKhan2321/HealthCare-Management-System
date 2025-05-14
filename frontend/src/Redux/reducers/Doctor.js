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
  
  export const doctorProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
      case DOCTOR_PROFILE_REQUEST:
        return { ...state, loading: true };
      case DOCTOR_PROFILE_SUCCESS:
        return { loading: false, profile: action.payload };
      case DOCTOR_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case DOCTOR_PROFILE_UPDATE_REQUEST:
        return { ...state, updating: true };
      case DOCTOR_PROFILE_UPDATE_SUCCESS:
        return { loading: false, updating: false, profile: action.payload, updateSuccess: true };
      case DOCTOR_PROFILE_UPDATE_FAIL:
        return { ...state, updating: false, updateError: action.payload };
      default:
        return state;
    }
  };
  
  
  export const doctorProfileCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DOCTOR_PROFILE_CREATE_REQUEST:
        return { loading: true };
      case DOCTOR_PROFILE_CREATE_SUCCESS:
        return { loading: false, profile: action.payload, success: true };
      case DOCTOR_PROFILE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  