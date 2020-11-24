import axios from 'axios';
let baseUrl = 'http://79.127.101.158:3500/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
