import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const HttpMethods = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
}

const executeRequest = (method, url, data, config) => {
  const authToken = localStorage.getItem('token');
  const axiosConfig = {
    ...config,
    headers: {
      'content-type': 'application/json',
      authorization: authToken && `Bearer ${authToken}`,
      ...config?.headers
    }
  }
  return axios[method](`${BASE_URL}${url}`, data, axiosConfig);
};

let methods = {
  get: url => executeRequest(HttpMethods.GET, url),
  save: (url, data) => executeRequest(HttpMethods.POST, url, data),
  update: (url, data) => executeRequest(HttpMethods.PUT, url, data),
  patch: (url, data) => executeRequest(HttpMethods.PATCH, url, data),
  remove: url => executeRequest(HttpMethods.DELETE, url)
};

export default methods