import { request } from '../api';
import { useEffect, useState } from 'react';
import { Auth } from '@aws-amplify/auth';

export default function useFetchData() {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      (async () => {
        const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
        const response = await request<{ message: string }>('/private', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.message);
        setLoading(false);
      })();
    }
  }, [isLoading]);

  return {
    message: data,
    isLoading
  }
}
