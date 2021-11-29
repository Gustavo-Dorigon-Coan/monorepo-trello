export const EDIT_CARD_TYPE = 'EDIT_CARD_TYPE';

const initialState = {
  open: false,
  card: {},
};

export const editCardState = (state = initialState, action) => {
  const { type, open, card } = action;
  if (type === EDIT_CARD_TYPE) {
    return {
      ...state,
      open: open,
      card: card,
    };
  }

  return state;
};