const initialState = {
    isVisible: false,
    message: '',
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return {
                ...state,
                isVisible: action.payload.isVisible,
                success: action.payload.success,
                message: action.payload.message,
            };
        default:
            return state;
    }
};

export default alertReducer;
