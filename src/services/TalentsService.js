import axios from 'axios';

export const getTalentsList = async (page, per_page, max_pages, filters = {}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}talents/getTalentsList`, {
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