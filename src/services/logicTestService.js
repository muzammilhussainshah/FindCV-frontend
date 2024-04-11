import axios from 'axios';

export const getQuestions = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}logic-test/getQuestions`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
