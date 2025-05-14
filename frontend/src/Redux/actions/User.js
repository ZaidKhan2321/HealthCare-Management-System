import axios from 'axios'
import {
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from '../constants/User.js'

const api = import.meta.env.VITE_BACKEND_API_URL

export const register = (name, email, password, role) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const reqData = {
            name,
            email,
            password,
            role: (role === "ADMIN") ? 0 : (role === "DOCTOR") ? 1 : 2
        }
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        const { data } = await axios.post(`${api}/user/signup`, reqData, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch({ type: USER_REGISTER_FAIL, payload: error })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        const { data } = await axios.post(`${api}/user/signin`, { email, password }, config)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch({ type: USER_LOGIN_FAIL, payload: error })
    }
}

export const logout = () => async (dispatch) => {
    try {
        // Optionally, call backend to clear cookie
        await axios.post(`${api}/user/logout`, {}, { withCredentials: true })
    } catch (err) {}
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const getProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo?.token}` }, withCredentials: true }
        const { data } = await axios.get(`${api}/user`, config)
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch({ type: USER_PROFILE_FAIL, payload: error })
    }
}

export const updateProfile = (name, email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo?.token}` }, withCredentials: true }
        const { data } = await axios.put(`${api}/user/update`, { name, email, password }, config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch({ type: USER_UPDATE_FAIL, payload: error })
    }
}
