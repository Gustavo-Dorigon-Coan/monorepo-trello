export const EDIT_LISTS_TYPE = 'EDIT_LISTS_TYPE';

const initialState = {
  open: false,
  projectId: null,
};

export const editListsState = (state = initialState, action) => {
  const { type, open, projectId } = action;
  if (type === EDIT_LISTS_TYPE) {
    return {
      ...state,
      open: open,
      projectId: projectId,
    };
  }

  return state;
};