import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-ecommerce-app-np0p.onrender.com/api",
});

export default api;