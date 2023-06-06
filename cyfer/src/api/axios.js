import axios from "axios";
const BASE_URL = "https://cyfer-backend-orbital.herokuapp.com";

export default axios.create({
    baseURL: BASE_URL,
});

// attached interceptors to the axios private (JWT tokens) refresh it if necessary
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
