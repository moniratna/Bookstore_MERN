import axios from 'axios';
import {  PRODUCT_FETCH_FAIL,
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_ARRIVAL_FETCH_REQUEST,
    PRODUCT_ARRIVAL_FETCH_SUCCESS,
    PRODUCT_ARRIVAL_FETCH_FAIL,
    PRODUCT_READ_FAIL,
    PRODUCT_READ_REQUEST,
    PRODUCT_READ_SUCCESS} from '../constants/productConstants';


export const getProducts = (sortBy) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_FETCH_REQUEST
        })
        // const body = JSON.stringify(user)
        const data = await axios.get(`http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6`)
        console.log("redux",data)
        dispatch({
            type: PRODUCT_FETCH_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: PRODUCT_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getProductsByArrival = (sortBy) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_ARRIVAL_FETCH_REQUEST
        })
        // const body = JSON.stringify(user)
        const data = await axios.get(`http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6`)
        console.log("redux",data)
        dispatch({
            type: PRODUCT_ARRIVAL_FETCH_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: PRODUCT_ARRIVAL_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const productRead = (productId) => async(dispatch) =>{
    try {
        dispatch({
            type: PRODUCT_READ_REQUEST
        })
        // const body = JSON.stringify(user)
        const data = await axios.get(`http://localhost:8000/api/product/${productId}`)
        console.log("redux product read",data)
        dispatch({
            type: PRODUCT_READ_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: PRODUCT_READ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}