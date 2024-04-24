import axios from 'axios';

export const updateUser = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/update`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if (response.data) {
            // console.log(response.data);
        }
        return response.data.token;
    } catch (error) {
        throw error.response.data;
    }
};

export const userVerifyEmail = async (token, emailToken) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/verifyEmail`, {token, emailToken});
        if (response.data) {
            // console.log(response.data);
        }
        return response.data.token;
    } catch (error) {
        throw error.response.data;
    }
};