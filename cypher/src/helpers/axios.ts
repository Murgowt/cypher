import axios from "axios";


const customAxios = axios.create({
    baseURL: 'http://cypherbackend-env.eba-eywrames.ap-south-1.elasticbeanstalk.com/api/',
    headers: {
      'Content-Type': 'application/json',
    },    
})

export default customAxios;
