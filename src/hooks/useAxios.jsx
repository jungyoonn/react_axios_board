import { useCallback, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/';

const UseAxios = (baseUrl = BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tmpToken = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzY4MTczMTEsImV4cCI6MTczOTQ5NTcxMSwic3ViIjoidXNlcjEwMEBlZWVycm9yY29kZS5jb20ifQ.cgMCIk7l_Wt-tSViqsfix5ETJF4-UYDdG8Z0-i1h2-WxSHHxRcO9cNRNGiC66eie';

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
            'Authorization':`Bearer ${tmpToken}`,
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
