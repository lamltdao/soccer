import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (additionalBody = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...additionalBody });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      /**
       * error body
       * statusCode
       * message: string | string[],
       * error
       */
      setErrors(err.response.data.message);
    }
  };

  return { doRequest, errors };
};

export default useRequest;
