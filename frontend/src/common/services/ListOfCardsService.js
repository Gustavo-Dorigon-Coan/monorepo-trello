import request from './RequestService';

class ListOfCardsService {
  findByProjectId = id => {
    return request.get(`/list-of-cards/project/${id}`);
  };
}

const instance = new ListOfCardsService();
export { instance as ListOfCardsService };