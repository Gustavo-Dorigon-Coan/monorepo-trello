export const PROJECTS_TYPE = 'PROJECTS_TYPE';

const initialState = {
  projects: [],
};

export const projectsState = (state = initialState, action) => {
  const { type, projects } = action;
  if (type === PROJECTS_TYPE) {
    return {
      ...state,
      projects: projects,
    };
  }

  return state;
};