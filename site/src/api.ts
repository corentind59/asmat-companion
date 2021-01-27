const BASE_URL = process.env.REACT_APP_API_ENDPOINT!;

export type HTTPErrorBody = {
  code: string,
  message?: string
};

export class HTTPError extends Error {
  constructor(public readonly status: number,
              public readonly body: HTTPErrorBody) {
    super(body.message ?? body.code);
  }
}

export async function request<T>(uri: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${uri}`, init);
  if (response.ok) {
    return response.status === 204 ? null : response.json();
  }
  const body = await response.json();
  throw new HTTPError(response.status, body);
}
