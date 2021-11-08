import request from './RequestService';

class CardService {
  setNextList = (id, list) => {
    return request.patch(`/cards/next-list/${id}`, list);
  };

  save = card => {
    return request.post(`/cards`, card);
  };
}

const instance = new CardService();
export { instance as CardService };