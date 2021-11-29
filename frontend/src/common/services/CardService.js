import request from './RequestService';
import * as queryString from "querystring";

class CardService {
  setNextList = (id, list) => {
    return request.patch(`/cards/next-list/${id}`, list);
  };

  save = card => {
    return request.post(`/cards`, card);
  };

  saveComment = comment => {
    return request.post(`/comment`, comment);
  };

  getComments = id => {
    return request.get(`/comment/card/${id}`);
  };

  getProject = id => {
    return request.get(`/cards/${id}/get_project`);
  };

  getList = id => {
    return request.get(`/cards/${id}/get_list`);
  };

  update = card => {
    return request.put(`/cards`, card);
  };

  remove = id => {
    return request.remove(`/cards/${id}`);
  };

  find = (userId, query) => {
    return request.get(`/cards/user/${userId}/find?${queryString.stringify(query).replaceAll('%3A', ':')}`);
  };
}

const instance = new CardService();
export { instance as CardService };