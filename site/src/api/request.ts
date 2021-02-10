import { HTTPError } from './models/http-error';
import { Auth } from '@aws-amplify/auth';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT!;

export async function request<T>(uri: string, init?: RequestInit): Promise<T> {
  const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
  const response = await fetch(encodeURI(`${BASE_URL}${uri}`), {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`
    }
  });
  if (response.ok) {
    return response.status === 204 ? null : response.json();
  }
  const body = await response.json();
  throw new HTTPError(response.status, body);
}
