import axios from "axios";

const api = axios.create({
    baseURL: "http://82.180.144.143:7000/api",
    withCredentials: true,
});

export default api;