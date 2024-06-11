import axios from "axios";


const customAxios = axios.create({
    baseURL: 'https://api1.upsolve.co.in/api/',
    headers: {
      'Content-Type': 'application/json',
    },    
})

export default customAxios;
