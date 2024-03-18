import axios from "axios";

export const axiosn = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://med-camp.vercel.app/"
    : "http://localhost:3000",
});
