import { COLORS } from "../../constants/Color";
import styled from "styled-components";
import {TextField} from "@mui/material";

const Input = styled(TextField)`
  color: ${COLORS.Light};
  background: ${COLORS.BackgroundIten};
  width: 100%;
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

const handleInput = (event, setObject, object, setErrors, errors, required, validation) => {
  setErrors({...errors, [event.target.name]: false});
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

const InputStyled = ({children, name, setObject, object, setErrors, errors, required = true, validation = () => true, type = 'text', ...props}) => {
  return <Input
      error={Boolean(errors) && Boolean(errors[name]) && errors[name]}
      onChange={event => handleInput(event, setObject, object, setErrors, errors, required, validation)}
      name={name}
      type={type}
      label={children}
      {...props}/>
}

export {InputStyled};