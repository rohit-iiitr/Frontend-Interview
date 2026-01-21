import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogs, getBlogById, createBlog } from '../lib/api';
import type { Blog } from '../types';

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });
};

export const useBlog = (id: string | undefined) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newBlog: Omit<Blog, 'id'>) => createBlog(newBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};
