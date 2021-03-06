import { COLORS } from "../../constants/Color";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";

const Input = styled(TextField)`
  color: ${COLORS.Light};
  background: ${COLORS.BackgroundIten};
  width: ${({width}) => width ? width : '100%'};
  border-radius: 6px;

  .css-ume8vi-MuiInputBase-input-MuiInput-input {
    padding-left: 8px;
  }

  .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root, .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    background-color: ${COLORS.BackgroundIten};
    left: -6px;
    padding: 4px 8px;
    border: none;
    border-radius: 2px;
  }
`;

const handleInput = (event, setObject, object, setErrors, errors, required, validation, setNoChangeRequired) => {
  setErrors({...errors, [event.target.name]: false});
  setNoChangeRequired(true);
  const value = event.target.value
  setObject({...object, [event.target.name]: value});
  if (required) {
    if (value.length <= 0) {
      setErrors({...errors, [event.target.name]: true});
    }
    if (!validation(value)) {
      setErrors({...errors, [event.target.name]: true});
    }
  }
}

const InputStyled = ({children, name, setObject, object, setErrors, errors, required = true, validation = () => true, wasSubmitted, type = 'text', ...props}) => {
  const [ noChangeRequired, setNoChangeRequired] = useState(false);

  useEffect(() => {
    wasSubmitted && setNoChangeRequired(true);
  },[wasSubmitted]);

  return <Input
      error={noChangeRequired && Boolean(errors) && Boolean(errors[name])}
      onChange={event => handleInput(event, setObject, object, setErrors, errors, required, validation, setNoChangeRequired)}
      name={name}
      value={Boolean(object) && Boolean(object[name]) ? object[name] : ''}
      type={type}
      label={children}
      {...props}/>
}

export {InputStyled};