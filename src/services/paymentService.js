import axios from 'axios';

export const requestTransaction = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}payment/requestTransaction`, data);
        if (response.data) {
            // console.log(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
