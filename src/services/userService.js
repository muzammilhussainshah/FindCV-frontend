import axios from 'axios';

export const updateUser = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/update`, { data, token });
        if (response.data) {
            // console.log(response.data);
        }
        return response.data.token;
    } catch (error) {
        throw error.response.data;
    }
};
