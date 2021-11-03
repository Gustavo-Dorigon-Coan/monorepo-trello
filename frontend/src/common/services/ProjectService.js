import request from './RequestService';

class ProjectService {
  findByUserId = id => {
    return request.get(`/projects/user/${id}`);
  };

  save = project => {
    return request.post(`/projects`, project);
  };
}

const instance = new ProjectService();
export { instance as ProjectService };