export const PROJECT_TYPE = 'PROJECT_TYPE';

const initialState = {
  project: {},
  id: null,
  listDropId: null,
  actualListDropId: null,
};

export const projectState = (state = initialState, action) => {
  const { type, project, id, listDropId, actualListDropId } = action;
  if (type === PROJECT_TYPE) {
    if (actualListDropId) {
      return {
        ...state,
        actualListDropId: actualListDropId,
      };
    } else if (listDropId) {
      return {
        ...state,
        listDropId: listDropId,
      };
    }
    return {
      ...state,
      project: project,
      id: id
    };
  }

  return state;
};