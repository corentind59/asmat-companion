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
