import { createStore, combineReducers } from 'redux';
import changeLocaleReducer from '../reducers/changeLocaleReducer';
import userLoginReducer from '../reducers/userLoginReducer';
const rootReducer = combineReducers(
    {
        locale: changeLocaleReducer,
        user: userLoginReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
};
export default configureStore;
