import axios from 'axios';

const BaseURL = process.env.REACT_APP_NASA_API_URL;


export const apiBase = axios.create({
    baseURL: BaseURL,
    params: {
        api_key: process.env.REACT_APP_NASA_API_KEY
    }
    
    
});

