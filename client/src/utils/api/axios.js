import axios from 'axios';

const config = {
    baseUrl: 'http://localhost:5000',
};

export const _axios = axios.create({
    baseURL: config.baseUrl,
});

_axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error.response);
    }
);

const header = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const errors = (errors) => {
    return {
        success: false,
        status: errors.status,
        error: errors,
    };
};

export const Get = async (url) => {
    try {
        const head = header();
        const get = await _axios.get(url, head);
        return get;
    } catch (error) {
        return errors(error);
    }
};

export const Post = async (url, params) => {
    try {
        const head = header();
        const get = await _axios.post(url, params, head);
        return get;
    } catch (error) {
        return errors(error);
    }
};
