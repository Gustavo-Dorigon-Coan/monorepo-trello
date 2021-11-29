import request from './RequestService';
import {HttpStatus} from "../constants/HttpStatus";

class AuthService {
  sign = async user => {
    const response = await request.post(`/auth/sign`, user);
    if (HttpStatus.isOkRange(response?.status)) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  };

  save = async user => {
    const response = await request.post(`/auth/signup`, user);
    if (HttpStatus.isOkRange(response?.status)) {
      await instance.sign(user);
    }
    return response;
  };

  validateToken = () => {
    const axiosConfig = {headers: {contentType: 'text/plain'}};
    return request.post(`/auth/validate-token`, `${instance.getToken()}`, axiosConfig);
  };

  getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
  };

  getToken = () => {
    return instance.getUser()?.accessToken;
  };

  signout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.href = "/login";
  };
}

const instance = new AuthService();
export { instance as AuthService };