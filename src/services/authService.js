import axios from 'axios';
import { setItemWithExpiration } from '../utils/localStorageHelpers';

export const signup = async (email, password, account_type) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, { email, password, account_type });
        if (response.data) {
            // save token
            setItemWithExpiration('findcv_user', response.data.token, 3600000); // 1 hour
        }
        return response.data.token;
    } catch (error) {

        if (error.response.data.error === 'User already exists with this email') {
            error.response.data['field'] = 'email';
            throw error;
        }
        else {
            throw error.response.data;
        }

    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, { email, password });
        if (response.data) {
            // save token
            setItemWithExpiration('findcv_user', response.data.token, 3600000); // 1 hour
        }
        return response.data.token;
    } catch (error) {

        if (error.response.data.error === 'Wrong password or email address') {
            error.response.data['field'] = 'email';
            error.response.data['field'] = 'password';
            throw error;
        }
        else {
            throw error.response.data;
        }

    }
};
