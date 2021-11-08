export const NEW_CARD_TYPE = 'NEW_CARD_TYPE';

const initialState = {
  open: false,
  list: {},
};

export const newCardState = (state = initialState, action) => {
  const { type, open, list } = action;
  if (type === NEW_CARD_TYPE) {
    return {
      ...state,
      open: open,
      list: list,
    };
  }

  return state;
};