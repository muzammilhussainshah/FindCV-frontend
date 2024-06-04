// import i18n from 'i18next';
import axios from 'axios';

export const updateJob = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/update`, data);
        if (response.data) {
            // console.log(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJob = async (job_id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobById/${job_id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJobsList = async (page, per_page, filters = {}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobsList`, {
            params: {
                page: page,
                per_page: per_page,
                filters: filters
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};