import {Button} from "@mui/material";
import styled from "styled-components";

const ButtonCuston = styled(Button)`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: ${({ mt }) => mt} !important;
` ;

const ButtonStyled = ({children, width = '100%', height = '42.25px', color = 'success',  mt = 'none', ...props}) => {
  return <ButtonCuston color={color} variant={'contained'} size={'large'} mt={mt} height={height} width={width} {...props}>{children}</ButtonCuston>
}

export {ButtonStyled};