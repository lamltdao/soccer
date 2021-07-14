import axios from 'axios';

const buildClient = ({ req } = {}) => {
  // if on the server
  if(typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/',// make req to be handled by ingress
      headers: req.headers, // include cookies
    });
  }
  else {
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;