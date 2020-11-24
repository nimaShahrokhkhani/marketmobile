import { createStore, combineReducers } from 'redux';
import changeLocaleReducer from '../reducers/changeLocaleReducer';
const rootReducer = combineReducers(
    { locale: changeLocaleReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
};
export default configureStore;
