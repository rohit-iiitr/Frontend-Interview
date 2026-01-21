import axios from 'axios';
import type { Blog } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>('/blogs');
    return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> => {
    // Add formatted date automatically if not present, though form should handle it.
    const response = await api.post<Blog>('/blogs', blog);
    return response.data;
};
