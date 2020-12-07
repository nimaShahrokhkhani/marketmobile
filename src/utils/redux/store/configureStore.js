import { createStore, combineReducers } from 'redux';
import changeLocaleReducer from '../reducers/changeLocaleReducer';
import userLoginReducer from '../reducers/userLoginReducer';
import addToShoppingCartReducer from '../reducers/addToShoppingCartReducer';
const rootReducer = combineReducers(
    {
        locale: changeLocaleReducer,
        user: userLoginReducer,
        products: addToShoppingCartReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
};
export default configureStore;
