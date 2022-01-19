import {
    CATEGORY_FETCH_FAIL,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FILTER_FETCH_FAIL,
    CATEGORY_FILTER_FETCH_REQUEST,
    CATEGORY_FILTER_FETCH_SUCCESS
} from '../constants/categoryConstants';

export const categoryFetchReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_FETCH_REQUEST:
        return { loading: true }
      case CATEGORY_FETCH_SUCCESS:
        return { loading: false, data: action.payload }
      case CATEGORY_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const getFilteredProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_FILTER_FETCH_REQUEST:
      return { loading: true }
    case CATEGORY_FILTER_FETCH_SUCCESS:
      return { loading: false, data: action.payload }
    case CATEGORY_FILTER_FETCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
