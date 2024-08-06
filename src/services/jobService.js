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

export const updateJobField = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/updateField`, data);
        if (response.data) {
            // console.log(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateApplicationField = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/updateApplicationField`, data);
        if (response.data) {
            // console.log(response.data);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJob = async (job_slug) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobBySlug/${job_slug}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJobByID = async (job_id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobById/${job_id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJobsList = async (page, per_page, max_pages, filters = {}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobsList`, {
            params: {
                page: page,
                per_page: per_page,
                max_pages: max_pages,
                filters: filters
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getJobApplicationsList = async (id, token, page, per_page, filters = {}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobApplicationsList/${id}`, {
            params: {
                token: token,
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

export const sendJobProposal = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/sendProposal`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const addJobToFavourites = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/addToFavourites`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const removeJobFromFavourites = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}job/removeFromFavourites`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}