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


export const genericError = (setAlert, alert, response) => {
  if (response === undefined) {
    setAlert({
      ...alert,
      open: true,
      message: `Ops! Houston temos um problema!`,
      severity: 'error'
    });
  } else if (Boolean(response.data.message)){
    setAlert({
      ...alert,
      open: true,
      message: `${response?.data?.message}`,
      severity: 'error'
    });
  } else {
    setAlert({
      ...alert,
      open: true,
      message: `Erro: ${response?.data?.status} - ${response?.data?.error}`,
      severity: 'error'
    });
  }
}