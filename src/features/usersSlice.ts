import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  firstName: string;
  maidenName: string;
  lastName: string;
  address: string;
  image: string;
  age: number;
  email: string;
}

interface useAPIResponse {
  users: User[];
  limit: number;
  total: number;
  skip: number;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    getUsers: builder.query<useAPIResponse, void>({
      query: () => {
        return {
          url: `users`,
          method: 'GET',
          params: {},
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
