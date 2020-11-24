import { CURRENT_LOCALE } from '../constants';
const initialState = {
    locale: 'fa_ir'
};
const changeLocaleReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENT_LOCALE:
            return {
                ...state,
                locale:action.payload
            };
        default:
            return state;
    }
};
export default changeLocaleReducer;
