import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:7000'
});


export default clienteAxios;