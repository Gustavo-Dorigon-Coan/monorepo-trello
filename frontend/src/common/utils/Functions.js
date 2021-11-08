import {ALERT_TYPE} from "../reducers/alertState";

export const verifyErrors = errors => {
  let existsErrors = Boolean(errors)
  if (existsErrors) {;
    // eslint-disable-next-line no-unused-vars
    for (const [ key, value ] of Object.entries(errors)) {
      if (existsErrors) existsErrors = !value;
    }
  }
  return existsErrors;
}


export const genericError = (dispatch, response) => {
  if (response === undefined) {
    dispatch({
      type: ALERT_TYPE,
      alert: {
        open: true,
        message: `Ops! Houston temos um problema!`,
        severity: 'error'
      },
    });
  } else if (Boolean(response.data.message)){
    dispatch({
      type: ALERT_TYPE,
      alert: {
        open: true,
        message: `${response?.data?.message}`,
        severity: 'error'
      },
    });
  } else {
    dispatch({
      type: ALERT_TYPE,
      alert: {
        open: true,
        message: `Erro: ${response?.data?.status} - ${response?.data?.error}`,
        severity: 'error'
      },
    });
  }
}