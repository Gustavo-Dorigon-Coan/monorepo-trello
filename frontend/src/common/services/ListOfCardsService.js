import request from './RequestService';

class ListOfCardsService {
  findByProjectId = id => {
    return request.get(`/list-of-cards/project/${id}`);
  }

  save = list => {
    return request.post(`/list-of-cards`, list);
  }
}

const instance = new ListOfCardsService();
export { instance as ListOfCardsService };