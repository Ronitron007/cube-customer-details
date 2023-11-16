import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const clientID = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

interface PhotoType {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.unsplash.com/',
    prepareHeaders: headers => {
      if (clientID) headers.set('Authorization', `Client-ID ${clientID}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getRandomPhotos: builder.query<PhotoType[], void>({
      query: () => {
        return {
          url: `photos/random`,
          method: 'GET',
          params: {
            count: 10,
          },
        };
      },
    }),
  }),
});

export const { useGetRandomPhotosQuery } = photosApi;
