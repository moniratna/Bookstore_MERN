import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer, userSignupReducer,
} from './reducers/userReducers'
import { productFetchReducer, productArrivalFetchReducer, productReadReducer } from './reducers/productReducers'
import { categoryFetchReducer, getFilteredProductsReducer } from './reducers/categoryReducers'


const reducer = combineReducers({

  userLogin: userLoginReducer,
  userSignup : userSignupReducer,
  productFetch : productFetchReducer, 
  productArrivalFetch: productArrivalFetchReducer,
  categoryFetch : categoryFetchReducer,
  getFilteredFetchProducts : getFilteredProductsReducer,
  productReadData : productReadReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('jwt')
  ? JSON.parse(localStorage.getItem('jwt'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },

}
const middleware = [thunk]



const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store