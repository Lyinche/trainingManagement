import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        //  `Bearer${token}`的Bearer是固定语法
        //注意持票人单词后面+空格 方便后期切割字符串
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        //解构token 在res.headers里
        const { authorization } = response.headers;
        authorization && localStorage.setItem('token', authorization);
        return response;
    },
    error => {
        const { status } = error.response;
        //token错误
        if (status === 401) {
            //删除localStorage里的token 跳转登录页
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
