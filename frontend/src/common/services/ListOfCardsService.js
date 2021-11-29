import request from './RequestService';

class ListOfCardsService {
  findByProjectId = id => {
    return request.get(`/list-of-cards/project/${id}`);
  }

  save = list => {
    return request.post(`/list-of-cards`, list);
  }

  changeColor = (id, color) => {
    return request.patch(`/list-of-cards/change_color/${id}`, color, {headers: {contentType: 'text/plain'}});
  }

  orderUp = (id) => {
    return request.patch(`/list-of-cards/order_up/${id}`);
  }

  orderDown = (id) => {
    return request.patch(`/list-of-cards/order_down/${id}`);
  }

  remove = (id) => {
    return request.remove(`/list-of-cards/${id}`);
  }
}

const instance = new ListOfCardsService();
export { instance as ListOfCardsService };