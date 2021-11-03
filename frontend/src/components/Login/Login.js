import {ModalStyled} from "../../common/components/ModalStyled/ModalStyled";
import {Grid} from "@mui/material";
import {InputStyled} from "../../common/components/Input/Input";
import {ButtonStyled} from "../../common/components/Button/Button";
import {SubTitle} from "../../common/components/SubTitle/SubTitle";
import React, {useState} from "react";
import {genericError, verifyErrors} from "../../common/utils/Functions";
import {AuthService} from "../../common/services/AuthService";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {useHistory} from "react-router-dom";
import {AlertStyled} from "../../common/components/AlertStyled/AlertStyled";

export const Login = () => {
  const [ errors, setErrors] = useState();
  const [ user, setUser] = useState();
  const [ alert, setAlert] = useState({open: false});
  const history = useHistory();

  const sign = async () => {
    if (verifyErrors(errors)) {
      const response = await AuthService.sign(user);
      if (HttpStatus.isOkRange(response?.status)) {
        history.push('/');
      } else if (response?.data?.status === HttpStatus.Unauthorized) {
        setAlert({...alert, open: true, message: 'Usuário/Senha incorretos!', severity: 'error'});
      } else {
        genericError(setAlert, alert, response);
      }
    } else {
      setAlert({...alert, open: true, message: 'Preencha os campos corretamente!', severity: 'error'});
    }
  }

  return <>
    <ModalStyled width={'400px'} open={true}>
      <Grid container spacing={3} display={'flex'} justifyContent={'center'}>
        <Grid item lg={12}>
          <SubTitle>Login</SubTitle>
        </Grid>
        <Grid item lg={12}>
          <InputStyled
              setObject={setUser}
              object={user}
              name={'username'}
              {...{errors, setErrors}}
          >Nome</InputStyled>
        </Grid>
        <Grid item lg={12}>
          <InputStyled
              setObject={setUser}
              object={user}
              name={'password'}
              type={'password'}
              validation={value => value.length >= 8}
              {...{errors, setErrors}}
          >Senha</InputStyled>
        </Grid>
        <Grid item lg={8}>
          <ButtonStyled onClick={() => sign()}>Entrar</ButtonStyled>
        </Grid>
        <Grid item lg={8}>
          <ButtonStyled onClick={() => history.push('/new-account')}>Criar Conta</ButtonStyled>
        </Grid>
      </Grid>
    </ModalStyled>
    <AlertStyled alert={alert} setAlert={setAlert}/>
  </>
}