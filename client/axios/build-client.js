import axios from 'axios';

const buildClient = ({ req }) => {
  // if on the server
  if(typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://localhost:3001/',// make req to be handled by ingress
      headers: req.headers,
    });
  }
  else {
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;