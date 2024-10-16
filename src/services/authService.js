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

export const socialLogin = async (data, socialAccType) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/socialSignin`, {
            socialAccType: socialAccType,
            accessToken: socialAccType === 'facebook' ? data.accessToken : data.access_token
        });
        if (response.data.token) setItemWithExpiration('findcv_user', response.data.token, 3600000 * 24); // 1 hour
        return response.data;
    } catch (error) {
    }
};

export const socialSignup = async (data, socialAccType, account_type) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/socialSignup`, {
            socialAccType: socialAccType,
            accountType: account_type,
            accessToken: socialAccType === 'facebook' ? data.accessToken : data.access_token,
            password: data.password
        });
        if (response.data.token) setItemWithExpiration('findcv_user', response.data.token, 3600000 * 24); // 1 hour

        return response.data.token;
    } catch (error) {
    }
};

export const verifyOTPCode = async (email, otp) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/verifyOTP`, { email, otp });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const resendOTPCode = async (email, account_type) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/resendOTP`, { email, account_type });
         return response.data;
    } catch (error) {
         throw error.response.data;
    }
};