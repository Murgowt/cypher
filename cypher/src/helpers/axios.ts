import axios from "axios";


const customAxios = axios.create({
    baseURL: 'http://cypher-backend-env.eba-faypief3.ap-south-1.elasticbeanstalk.com/api',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },    
})

export default customAxios;
