import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const baseQuery = fetchBaseQuery({baseUrl: `${API_BASE_URL}/api/v1`, 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('userInfo');
        const parsedToken = JSON.parse(token);
        const accessToken = parsedToken?.accessToken;

        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
      },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Expense', 'User'],
    endpoints: (builder) => ({})
});