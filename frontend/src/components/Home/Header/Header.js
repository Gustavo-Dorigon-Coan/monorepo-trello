import {Grid} from "@mui/material";
import {Title} from "../../../common/components/Title/Title";
import { AppTitle } from "../../../common/constants/Constants";
import {ButtonStyled} from "../../../common/components/Button/Button";
import {AuthService} from "../../../common/services/AuthService";
import {COLORS} from "../../../common/constants/Color";
import {Person} from "@mui/icons-material";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 88px;
  background: ${COLORS.BackgroundIten};
  margin-bottom: 16px;
`;

export const Wrapper = styled(Grid)`
  width: 100%;
  padding: 0px 16px 0 16px;
`;

export const Header = ({setOpenModalProject}) => {
  const user = AuthService.getUser();
  return <Container>
    <Wrapper container spacing={3} display={"flex"} alignItems={"center"}>
      <Grid item lg={4} display={'flex'}>
        <Title>{AppTitle}</Title>
      </Grid>
      <Grid item lg={2} justifyContent={'right'} display={'flex'}>
        <ButtonStyled width={'170px'} height={'42px'} onClick={() => setOpenModalProject(true)}>Novo Projeto</ButtonStyled>
      </Grid>
      <Grid item lg={2}>
        <ButtonStyled width={'170px'} height={'42px'} onClick={() => AuthService.signout()}>Sair</ButtonStyled>
      </Grid>
      <Grid item lg={4} display={'flex'} justifyContent={'right'}>
        {user && <Title margin={'0 8px'} color={COLORS.Blue}>{user?.username}</Title>}
        <Person style={{marginLeft: '8px', width: '64px', height: '64px'}}/>
      </Grid>
    </Wrapper>
  </Container>
}