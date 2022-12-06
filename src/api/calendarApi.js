import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

const { VITE_API_URL } = getEnvVariable();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// Todo: configure interceptors

export default calendarApi;