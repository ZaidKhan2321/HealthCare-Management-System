import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import {
    userRegisterReducer,
    userLoginReducer,
    userProfileReducer,
    userUpdateReducer
} from './reducers/User.js'
import { 
    patientProfileReducer,
    patientUpdateReducer,
    patientCreateReducer
} from './reducers/Patient.js'
import { 
    doctorProfileCreateReducer,
    doctorProfileReducer
} from './reducers/Doctor.js';
import { doctorPublicListReducer } from './reducers/DoctorPublic.js';
import { patientPrescriptionsReducer } from './reducers/Prescription.js';

const userInfo = localStorage.getItem("userInfo")
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null
const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
    reducer: {
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
        userProfile: userProfileReducer,
        userUpdate: userUpdateReducer,
        patientProfile: patientProfileReducer,
        patientUpdate: patientUpdateReducer,
        patientCreate: patientCreateReducer,
        doctorProfileCreate: doctorProfileCreateReducer,
        doctorProfile: doctorProfileReducer,
        doctorPublicList: doctorPublicListReducer,
        patientPrescriptions: patientPrescriptionsReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store

