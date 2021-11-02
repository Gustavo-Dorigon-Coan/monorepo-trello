import {Button} from "@mui/material";
import styled from "styled-components";

const ButtonCuston = styled(Button)`
  height: 56px;
  width: ${({ width }) => width};
` ;

const ButtonStyled = ({children, width = '100%', ...props}) => {
  return <ButtonCuston color={'secondary'} variant={'contained'} size={'large'} width={width} {...props}>{children}</ButtonCuston>
}

export {ButtonStyled};