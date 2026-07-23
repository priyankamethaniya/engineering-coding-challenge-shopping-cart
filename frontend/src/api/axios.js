import axios from "axios";

import { getUserId } from "../utils/user";

const api = axios.create({
    baseURL:"http://localhost:3001/api",
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
        "X-USER-ID":getUserId()
    }
});

export default api;
