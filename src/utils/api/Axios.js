import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "https://carbon-chain-backend.vercel.app",
});
export default AxiosInstance;
