import { types } from '../types';

const initialState = {
    isAuthorized: false,
    isAdmin: false,
    data: { firstName: '', lastName: '' },
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_DATA:
            return {
                ...state,
                data: action.payload.data,
                isAuthorization: action.payload.status === 200 ? true : false,
                isAdmin: action.payload.data.role === 1 ? true : false,
            };
        default:
            return state;
    }
};

export default authReducer;
