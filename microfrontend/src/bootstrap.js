import axios from "axios";
 
window.axios = axios;
 
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
//window.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//window.axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS, post, get";
//window.axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
//window.axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
//window.axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
window.axios.defaults.headers.common["Content-Type"] = "application/json";
//window.axios.defaults.headers.common["X-Origin"] = "localhost:3001";
//window.axios.defaults.headers.common["Host"] = "localhost:3001";
window.axios.defaults.headers.common["Accept"] = "application/json";
//window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://localhost:3001/api";