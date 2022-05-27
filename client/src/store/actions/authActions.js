import { getProfile } from '../../utils/api';
import { types } from '../types';

export const getUserData = () => async (dispatch) => {
    let res = await getProfile();

    dispatch({
        type: types.GET_USER_DATA,
        payload: res,
    });
};
