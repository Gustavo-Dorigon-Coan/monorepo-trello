import {Box, Container, Grid} from "@mui/material";
import {Input, InputStyled} from "../../../common/components/Input/Input";
import {ButtonStyled} from "../../../common/components/Button/Button";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import {ModalStyled} from "../../../common/components/Modal/Modal";

export const NewProject = ({open, setOpen}) => {
  return <ModalStyled open={open} closeButton={() => setOpen(false)}>
      <Grid container spacing={3}>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={6}>
            <SubTitle margin={'0 0 0 16px'}>Novo Projeto</SubTitle>
          </Grid>
        </Grid>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={12}>
            <InputStyled label="Nome do Projeto"/>
          </Grid>
          <Grid container item lg={12}>
            <Grid item lg={9}></Grid>
            <Grid item lg={3}>
              <ButtonStyled>Cadastrar</ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalStyled>
}