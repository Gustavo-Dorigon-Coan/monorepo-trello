import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {COLORS} from "../../../common/constants/Color";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";

export const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  background: ${COLORS.BackgroundIten};
`;

export const Header = ({title}) => {
  const history = useHistory();

  return <Container>
    <Button color={'success'} onClick={() => history.push('/')}>
      <ArrowBackIcon color={COLORS.White}/>
    </Button>
    <SubTitle margin={'8px 0 0 16px'} color={COLORS.Light}>{title}</SubTitle>
  </Container>
}