import {configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { userRegisterReducer } from './reducers/User.js'

const userInfo = localStorage.getItem("userInfo") ;
const userInfoFromStorage = userInfo? JSON.parse(userInfo): null ;
const initialState = {
    userLogin : {userInfo : userInfoFromStorage}
} ;

const store = configureStore({
    reducer: {
        userRegister: userRegisterReducer
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
}) ;

export default store ;