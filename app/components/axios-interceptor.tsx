"use client";

import { useEffect } from "react";
import { api } from "../lib/axios";
import { useUiStore } from "../lib/zustand";

export default function AxiosInterceptor() {
    useEffect(() => {
        const setLoading = useUiStore.getState().setLoading;

        let activeRequests = 0;

        const reqInterceptor = api.interceptors.request.use((config) => {
            activeRequests++;
            if (activeRequests === 1) {
                setLoading(true, "Carregando...");
            }
            return config;
        }, (error) => {
            activeRequests = Math.max(0, activeRequests - 1);
            if (activeRequests === 0) setLoading(false, null);
            return Promise.reject(error);
        });

        const resInterceptor = api.interceptors.response.use((response) => {
            activeRequests = Math.max(0, activeRequests - 1);
            if (activeRequests === 0) setLoading(false, null);
            return response;
        }, (error) => {
            activeRequests = Math.max(0, activeRequests - 1);
            if (activeRequests === 0) setLoading(false, null);
            return Promise.reject(error);
        });

        return () => {
            api.interceptors.request.eject(reqInterceptor);
            api.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return null;
}
