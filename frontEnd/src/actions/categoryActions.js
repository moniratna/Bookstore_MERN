import axios from 'axios';
import {  CATEGORY_FETCH_FAIL,
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_FILTER_FETCH_REQUEST,
    CATEGORY_FILTER_FETCH_SUCCESS,
    CATEGORY_FILTER_FETCH_FAIL
     } from '../constants/categoryConstants';


export const getCategories = (sortBy) => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_FETCH_REQUEST
        })
        // const body = JSON.stringify(user)
        const data = await axios.get(`http://localhost:8000/api/categories`)
        console.log("redux",data)
        dispatch({
            type: CATEGORY_FETCH_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: CATEGORY_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getFilteredProducts = (skip, limit, filters ={})=> async(dispatch)=>{
    
    try {
        dispatch({
            type: CATEGORY_FILTER_FETCH_REQUEST
        })
        const body = {
            limit, skip, filters
        }
        const config = {
            headers: {
                Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }
        const postBody = JSON.stringify(body)
        const data = await axios.post(`http://localhost:8000/api/products/by/search`,postBody, config)
        console.log("redux",data)
        dispatch({
            type: CATEGORY_FILTER_FETCH_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: CATEGORY_FILTER_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}