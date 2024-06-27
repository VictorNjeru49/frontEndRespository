import axios from "axios";

const Apiset = axios.create({
  baseURL: "https://backendbookreposity.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Apiset;