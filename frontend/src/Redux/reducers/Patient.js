import {
  PATIENT_PROFILE_REQUEST, PATIENT_PROFILE_SUCCESS, PATIENT_PROFILE_FAIL,
  PATIENT_UPDATE_REQUEST, PATIENT_UPDATE_SUCCESS, PATIENT_UPDATE_FAIL,
  PATIENT_CREATE_REQUEST, PATIENT_CREATE_SUCCESS, PATIENT_CREATE_FAIL,
  MEDICAL_HISTORY_UPDATE_REQUEST, MEDICAL_HISTORY_UPDATE_SUCCESS, MEDICAL_HISTORY_UPDATE_FAIL,
  EHR_UPDATE_REQUEST, EHR_UPDATE_SUCCESS, EHR_UPDATE_FAIL
} from '../constants/Patient.js'
  
  export const patientProfileReducer = (state = {}, action) => {
    switch(action.type) {
      case PATIENT_PROFILE_REQUEST:
        return { loading: true }
      case PATIENT_PROFILE_SUCCESS:
        return { loading: false, profile: action.payload }
      case PATIENT_PROFILE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const patientUpdateReducer = (state = {}, action) => {
    switch(action.type) {
      case PATIENT_UPDATE_REQUEST:
        return { loading: true }
      case PATIENT_UPDATE_SUCCESS:
        return { loading: false, success: true, profile: action.payload }
      case PATIENT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const patientCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loading: true }
    case PATIENT_CREATE_SUCCESS:
      return { loading: false, success: true, profile: action.payload }
    case PATIENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

  