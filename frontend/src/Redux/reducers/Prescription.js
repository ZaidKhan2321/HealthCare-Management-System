import {
    PATIENT_PRESCRIPTIONS_REQUEST,
    PATIENT_PRESCRIPTIONS_SUCCESS,
    PATIENT_PRESCRIPTIONS_FAIL,
  } from '../constants/Prescription.js';
  
  export const patientPrescriptionsReducer = (state = { prescriptions: [] }, action) => {
    switch (action.type) {
      case PATIENT_PRESCRIPTIONS_REQUEST:
        return { loading: true, prescriptions: [] };
      case PATIENT_PRESCRIPTIONS_SUCCESS:
        return { loading: false, prescriptions: action.payload };
      case PATIENT_PRESCRIPTIONS_FAIL:
        return { loading: false, error: action.payload, prescriptions: [] };
      default:
        return state;
    }
  };
  