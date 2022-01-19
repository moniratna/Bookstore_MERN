import {
    PRODUCT_FETCH_FAIL,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_REQUEST,
    PRODUCT_ARRIVAL_FETCH_FAIL,
    PRODUCT_ARRIVAL_FETCH_REQUEST,
    PRODUCT_ARRIVAL_FETCH_SUCCESS,
    PRODUCT_READ_REQUEST,
    PRODUCT_READ_SUCCESS,
    PRODUCT_READ_FAIL
} from '../constants/productConstants';

export const productFetchReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_FETCH_REQUEST:
        return { loading: true }
      case PRODUCT_FETCH_SUCCESS:
        return { loading: false, data: action.payload }
      case PRODUCT_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const productArrivalFetchReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_ARRIVAL_FETCH_REQUEST:
        return { loading: true }
      case PRODUCT_ARRIVAL_FETCH_SUCCESS:
        return { loading: false, data: action.payload }
      case PRODUCT_ARRIVAL_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const productReadReducer = (state={}, action) =>{
    switch(action.payload) {
      case PRODUCT_READ_REQUEST:
        return {loading: true}
      case PRODUCT_READ_SUCCESS:
        return { loading: false, data: action.payload }
      case PRODUCT_READ_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }