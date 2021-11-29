import React, {useEffect, useState} from 'react';
import {FormLabel, Input} from "@mui/material";
import styled from "styled-components";

const ColorButtonStyled = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
  display: flex;
  border-radius: 8px;
  background: ${({color}) => color ? color : '#fefefe'};
`;

const FormLabelFlex = styled(FormLabel)`
  display: flex;
`;

const InputColor = styled(Input)`
  position: absolute;
  left: 50px;
  opacity: 0;
  height: 0;
  left: -50%;
`;
export const ColorButton = ({onChange, initialColor}) => {
  const [ colorInternal, setColorInternal ] = useState('#fefefe');

  useEffect(() => {
    setColorInternal(initialColor);
  },[initialColor]);

  const onChangeInternal = event => {
    if (onChange) onChange(event.target.value);
    setColorInternal(event.target.value);
  }

  return (
    <FormLabelFlex>
      <ColorButtonStyled color={colorInternal} />
      <InputColor value={colorInternal} onChange={event => onChangeInternal(event)} type={'color'}/>
    </FormLabelFlex>
  );
};