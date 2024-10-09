import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jsonServerApi = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            // const token = getState().auth.token
            const token = localStorage.getItem('token')
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Post', 'User', 'Comment', 'Todo', 'Album', 'Photo'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (querySting) => {
                return `/users${querySting || ''}`
            },
            providesTags: ['User'],
        }),
        getTodos: builder.query({
            query: (querySting) => {
                return `/todos${querySting || ''}`
            },
            providesTags: ['Todo'],
        }),
        getPosts: builder.query({
            query: (querySting) => {
                // console.log(querySting);
                
                return `/posts${querySting || ''}`
            },
            providesTags: ['Post'],
        }),
        getComments: builder.query({
            query: (querySting) => {
                return `/comments${querySting}`
            },
            providesTags: ['Comment'],
        }),
        getAlbums: builder.query({
            query: (querySting) => {
                return `/albums${querySting}`
            },
            providesTags: ['Album'],
        }),
        getPhotos: builder.query({
            query: (querySting) => {
                return `/photos${querySting}`
            },
            providesTags: ['Photo'],
        }),
        addPost: builder.mutation({
            query: (data) => {
                console.log(data, 'data');
                return {
                    url: `/posts`, body: data, method: 'POST',
                    //  headers: { 'Authorization': `Bearer TOKEN` }
                }
            },
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: (data) => {
                console.log(data, 'data');
                return {
                    url: `/posts/${data.id}`, body: data, method: 'PATCH',
                }
            },
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation({
            query: (id) => {
                console.log(id, 'id');
                return {
                    url: `/posts/${id}`, method: 'DELETE',
                }
            },
            invalidatesTags: ['Post'],
        }),
        updateComment: builder.mutation({
            query: (data) => {
                console.log(data, 'data');
                return { url: `comments/${data.id}`, body: data, method: 'PUT', headers: { 'Authorization': `Bearer TOKEN` } }
            },
            invalidatesTags: ['Comment'],
        })
    }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useGetTodosQuery,
    useLazyGetTodosQuery,
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useGetAlbumsQuery,
    useLazyGetAlbumsQuery,
    useGetPhotosQuery,
    useLazyGetPhotosQuery,
    useAddPostMutation,
    useUpdatePostMutation, useDeletePostMutation
} = jsonServerApi