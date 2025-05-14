import {
    DOCTOR_PUBLIC_LIST_REQUEST,
    DOCTOR_PUBLIC_LIST_SUCCESS,
    DOCTOR_PUBLIC_LIST_FAIL,
  } from '../constants/DoctorPublic.js';
  
  export const doctorPublicListReducer = (state = { doctors: [], page: 1, pages: 1 }, action) => {
    switch (action.type) {
      case DOCTOR_PUBLIC_LIST_REQUEST:
        return { loading: true, doctors: [] };
      case DOCTOR_PUBLIC_LIST_SUCCESS:
        return {
          loading: false,
          doctors: action.payload.doctors,
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      case DOCTOR_PUBLIC_LIST_FAIL:
        return { loading: false, error: action.payload, doctors: [] };
      default:
        return state;
    }
  };
  