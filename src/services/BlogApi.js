import axios from 'axios';

const baseUrl = "http://localhost:8000/api/";

export const BlogApi = axios.create({
    baseURL: baseUrl
})