import axios from "axios";


const customAxios = axios.create({
    baseURL: 'https://api.cypheryard.com/api',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },    
})

export default customAxios;
