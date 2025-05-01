import axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/User.js'

const api = import.meta.env.VITE_BACKEND_API_URL

export const register = (name, email, password, role)=>async(dispatch)=>{
    try{
        dispatch({ type: USER_REGISTER_REQUEST }) ;
        const reqData = {
            name: name,
            email: email,
            password: password,
            role: (role === "ADMIN")? 0: (role === "DOCTOR")? 1 : 2
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`${api}/user/signup`, reqData, config) ;
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data }) ;
        // dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data }) ;
        localStorage.setItem('userInfo', JSON.stringify(response.data)) ;
    }catch(err){
        let errRes = false ;
        if(err.response && err.response.data.message) errRes = true ;
        dispatch({ type: USER_REGISTER_FAIL, payload: errRes? err.response.data.message : err.message }) ;
    }
}