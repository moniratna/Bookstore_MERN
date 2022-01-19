import axios from 'axios';
import {  USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS } from '../constants/userConstants';


export const login = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config ={ 
            headers: {
                Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(user)
        const data = await axios.post('http://localhost:8000/api/signin', body,config)
        console.log("redux",data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const signup = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config ={ 
            headers: {
                Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(user)
        const data = await axios.post('http://localhost:8000/api/signup', body,config)
        console.log("redux",data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}