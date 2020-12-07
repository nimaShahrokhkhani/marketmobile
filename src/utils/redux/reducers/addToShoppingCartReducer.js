import { ADD_PRODUCT, DELETE_PRODUCT, INCREASE_PRODUCT, DECREASE_PRODUCT, DELETE_PRODUCTS,  } from '../constants';
const initialState = {
    products: []
};
const addToShoppingCartReducer = (state = initialState, action) => {
    let result = {};
    switch(action.type) {
        case ADD_PRODUCT:
            let productInStateAdd = (state.products && state.products.length > 0) ? state.products.filter(product => product.value.serialNumber === action.product.serialNumber) : [];
            result =(productInStateAdd && productInStateAdd.length > 0) ?
                {
                    ...state,
                    products: state.products.map((item) => (
                        item.value.serialNumber === action.product.serialNumber ? {...item, count: ++item.count} : item
                    ))
                }
                :
                {
                    ...state,
                    products: [...state.products, {value: action.product, count: 1}]
                };
            return result;
        case DELETE_PRODUCT:
            result = {
                ...state,
                products: state.products.filter(item => item.value.serialNumber !== action.product.serialNumber)
            };
            return result;
        case DELETE_PRODUCTS:
            result = {
                ...state,
                products: []
            };
            return result;
        case DECREASE_PRODUCT:
            let productInStateDecrease = (state.products && state.products.length > 0) ? state.products.filter(product => product.value.serialNumber === action.product.serialNumber) : [];
            result = (productInStateDecrease && productInStateDecrease.length > 0 && productInStateDecrease[0].count > 1) ?
                {
                    ...state,
                    products: state.products.map((item) => (
                        item.value.serialNumber === action.product.serialNumber ? {...item, count: --item.count} : item
                    ))
                }
                :
                {
                    ...state,
                    products: state.products.filter(item => item.value.serialNumber !== action.product.serialNumber)
                };
            return result;
        case INCREASE_PRODUCT:
            result = {
                ...state,
                products: state.products.map((item) => (
                    item.value.serialNumber === action.product.serialNumber ? {...item, count: ++item.count} : item
                ))
            };
            return result;
        default:
            return state;
    }
};
export default addToShoppingCartReducer;
