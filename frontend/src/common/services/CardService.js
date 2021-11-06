import request from './RequestService';

class CardService {
  findByListOfCardsId = id => {
    return request.get(`/cards/list-of-cards/${id}`);
  };

  setNextList = (id, list) => {
    return request.patch(`/cards/next-list/${id}`, list);
  };
}

const instance = new CardService();
export { instance as CardService };