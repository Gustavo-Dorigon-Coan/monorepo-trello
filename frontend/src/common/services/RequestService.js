import axios from 'axios';
import {AuthService} from "./AuthService";

const BASE_URL = 'http://localhost:8080';

const HttpMethods = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
}

const executeRequest = (method, url, data, config) => {
  const authToken = AuthService.getToken();
  const instance = axios.create({
    headers: {
      'content-type': config?.headers?.contentType ? config?.headers?.contentType : 'application/json',
      'authorization': authToken && `Bearer ${authToken}`,
    }
  });
  instance.interceptors.response.use(
      response => {return response;},
      error => {return error.response}
  );
  return instance[method](`${BASE_URL}${url}`, data);
};

let methods = {
  get: url => executeRequest(HttpMethods.GET, url),
  post: (url, data, config) => executeRequest(HttpMethods.POST, url, data, config),
  put: (url, data) => executeRequest(HttpMethods.PUT, url, data),
  patch: (url, data, config) => executeRequest(HttpMethods.PATCH, url, data, config),
  remove: url => executeRequest(HttpMethods.DELETE, url)
};

export default methods