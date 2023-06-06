//hooks to attach the axios interceptors to the axios instance
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken(); //define the function
    const { auth } = useAuth(); //auth state

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    //if the headers is not set before
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.newAccessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response, // if response is good just return it
            async (error) => {
                //if token expired
                const prevRequest = error?.config; //get previous request from config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    // if sent does not exist
                    // retryonce
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.header[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); //send request again
                }
                return Promise.reject(error); // return the error
            }
        );
        // need to remove them at the end
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
