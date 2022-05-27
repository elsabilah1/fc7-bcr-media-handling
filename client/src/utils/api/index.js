import { Get, Post, _axios } from './axios';

const setDefaults = (token) => {
    _axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const setAuth = (data) => {
    localStorage.setItem('authentication', JSON.stringify(data));
    setDefaults(data.token);
};

export const login = (userData) => {
    return Post('/api/auth/login', {
        ...userData,
    }).then((res) => {
        if (res.status !== 200) {
            return res;
        } else {
            setAuth({ token: res.data.token });
            return res.data.token;
        }
    });
};

export const register = (userData) => {
    return Post('/api/auth/register', {
        ...userData,
    }).then((res) => {
        if (res.status !== 200) {
            return res;
        } else {
            setAuth({ token: res.data.token });
            return res.data.token;
        }
    });
};

export const logout = () => {
    localStorage.removeItem('authentication');
};

export const getAuth = () => {
    const auth = JSON.parse(localStorage.getItem('authentication'));
    if (auth) {
        setDefaults(auth.token);
        return auth;
    }
    return null;
};

export const getProfile = () => {
    getAuth();
    return Get('/api/user/profile');
};
