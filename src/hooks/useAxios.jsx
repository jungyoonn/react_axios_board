import { useCallback, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/board/';

const UseAxios = (baseUrl = BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const req = useCallback(
    async (method, endpoint, body = null, addHeaders = {}) => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios({
          url: `${baseUrl}${endpoint}`,
          method,
          data: body,
          headers: {
            'Content-Type':'application/json',
            ...addHeaders
          }
        });
        setData(resp.data);
      } catch(err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  , [baseUrl]);

  return {data, loading, error, req};
}

export default UseAxios;
