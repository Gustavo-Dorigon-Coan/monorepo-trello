export const ALERT_TYPE = 'ALERT_TYPE';

const initialState = {
  alert: {},
};

export const alertState = (state = initialState, action) => {
  const { type, alert } = action;
  if (type === ALERT_TYPE) {
    return {
      ...state,
      alert: alert,
    };
  }

  return state;
};