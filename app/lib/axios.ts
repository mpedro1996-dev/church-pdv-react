import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
// `api` exported for use across the app. Interceptors are attached
// from a client component (`app/components/axios-interceptor.tsx`) so
// that they can call client-side hooks (zustand) safely.