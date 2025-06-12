import axios from "axios";

const api = axios.create({
  baseURL: "https://json-server-vercel-vert-mu.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
