import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

export const useAxiosSecure = () => {
    const { user } = useAuth()
    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            }
        )

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };
    }, [user]);

    return axiosSecure;
};