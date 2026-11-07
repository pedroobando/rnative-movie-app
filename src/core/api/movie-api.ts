import { create } from 'axios';

export const movieApi = create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
  params: {
    language: 'es-MX',
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  },
});
