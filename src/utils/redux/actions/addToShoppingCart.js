import { ADD_PRODUCT, DELETE_PRODUCTS, DELETE_PRODUCT, DECREASE_PRODUCT, INCREASE_PRODUCT } from '../constants';
export function addProduct(product) {
    return({
        type: ADD_PRODUCT,
        product     // action payload
    })
}

export function deleteAllProducts() {
    return({
        type: DELETE_PRODUCTS
        // action payload
    })
}

export function deleteProduct(product) {
    return({
        type: DELETE_PRODUCT,
        product     // action payload
    })
}

export function decreaseProduct(product) {
    return({
        type: DECREASE_PRODUCT,
        product     // action payload
    })
}

export function increaseProduct(product) {
    return({
        type: INCREASE_PRODUCT,
        product     // action payload
    })
}
