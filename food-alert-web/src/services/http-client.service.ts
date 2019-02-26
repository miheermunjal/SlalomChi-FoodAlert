enum RequestMethod {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
}

export const get = (url: string): Promise<Response> => {
  return makeRequest(url, RequestMethod.GET);
};

export const post = (url: string, body: {}): Promise<Response> => {
  return makeRequest(url, RequestMethod.POST, body);
};

export const put = (url: string, body: {}): Promise<Response> => {
  return makeRequest(url, RequestMethod.PUT, body);
};

// tslint:disable-next-line:no-any
const makeRequest = (url: string, method: RequestMethod, body?: {}): Promise<any> => {
  const headers = constructHeaders(method);

  const requestOptions: RequestInit = {
    body,
    method,
    headers
  };

  return fetch(url, requestOptions)
    .catch(err => handleError(err))
    .then((res: Response) => res.json());
};

const constructHeaders = (method: string): Headers => {
  const options = method === RequestMethod.POST ?
    { 'Content-Type': 'application/json' } : {};

  const headers = new Headers(options);
  // headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  return headers;
};

// tslint:disable-next-line:no-any
export const handleError = (error: Response): any => {
  // TODO: Do something with the errors (global toast)?
  // tslint:disable-next-line:no-console
  console.error(error);

  return Promise.reject(error);
};
