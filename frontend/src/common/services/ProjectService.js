import request from './RequestService';

class ProjectService {
  findByUserId = id => {
    return request.get(`/projects/user/${id}`);
  };

  findById = id => {
    return request.get(`/projects/${id}`);
  };

  save = project => {
    return request.post(`/projects`, project);
  };

  rename = project => {
    return request.patch(`/projects/rename/${project.id}`, project.name, {headers: {contentType: 'text/plain'}});
  };

  remove = id => {
    return request.remove(`/projects/${id}`);
  };
}

const instance = new ProjectService();
export { instance as ProjectService };