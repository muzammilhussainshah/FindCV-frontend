import i18n from 'i18next';
import axios from 'axios';
import { setItemWithExpiration } from '../utils/localStorageHelpers';

export const signup = async (email, password, account_type) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, { email, password, account_type });
        if (response.data) {
            // save token
            setItemWithExpiration('findcv_user', response.data.token, 3600000 * 24); // 1 hour
        }
        return response.data.token;
    } catch (error) {

        if (error.response.data.error === 'User already exists with this email') {
            error.response.data.error = i18n.t('forms.create_account.user_already_exists_with_this_email');
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
            setItemWithExpiration('findcv_user', response.data.token, 3600000 * 24); // 1 hour
        }
        return response.data.token;
    } catch (error) {

        if (error.response.data.error === 'Wrong password or email address') {
            error.response.data.error = i18n.t('forms.login.wrong_password_or_email_address');
            error.response.data['field'] = 'email';
            error.response.data['field'] = 'password';
            throw error;
        }
        else {
            throw error.response.data;
        }

    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/resetPassword`, { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const submitPasswordReset = async (passwordToken, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/submitResetPassword`, { passwordToken, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const facebookLogin = async (data) => {
    try {
        // const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, { email, password, account_type });

        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/facebookAuth`, { accountType: "employer", accessToken: data.accessToken });
        if (response.data) {
            // save token
            setItemWithExpiration('findcv_user', response.data.token, 3600000 * 24); // 1 hour
        }
        return response.data.token;
    } catch (error) {
        // console.log(error, 'facebookLogin error')
    }
};