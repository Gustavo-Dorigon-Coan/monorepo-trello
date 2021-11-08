import {ModalStyled} from "../../common/components/ModalStyled/ModalStyled";
import {Grid} from "@mui/material";
import {InputStyled} from "../../common/components/InputStyled/InputStyled";
import {ButtonStyled} from "../../common/components/Button/Button";
import {SubTitle} from "../../common/components/SubTitle/SubTitle";
import React, {useState} from "react";
import {genericError, verifyErrors} from "../../common/utils/Functions";
import {AuthService} from "../../common/services/AuthService";
import { AppTitlePage } from "../../common/constants/Constants";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ALERT_TYPE} from "../../common/reducers/alertState";

export const Login = () => {
  const [ errors, setErrors] = useState({password: true, username: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const [ user, setUser] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  document.title = AppTitlePage + 'Login';

  const sign = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await AuthService.sign(user);
      if (HttpStatus.isOkRange(response?.status)) {
        history.push('/');
      } else if (response?.data?.status === HttpStatus.Unauthorized) {
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Usuário/Senha incorretos!', severity: 'error'},
        });
      } else {
        genericError(dispatch, response);
      }
    } else {
      dispatch({
        type: ALERT_TYPE,
        alert: {open: true, message: 'Preencha os campos corretamente!', severity: 'error'},
      });
    }
  }

  return <ModalStyled width={'400px'} open={true}>
    <Grid container spacing={3} display={'flex'} justifyContent={'center'}>
      <Grid item sm={12}>
        <SubTitle>Login</SubTitle>
      </Grid>
      <Grid item sm={12}>
        <InputStyled
            setObject={setUser}
            object={user}
            name={'username'}
            {...{errors, setErrors, wasSubmitted}}
        >Nome</InputStyled>
      </Grid>
      <Grid item sm={12}>
        <InputStyled
            setObject={setUser}
            object={user}
            name={'password'}
            type={'password'}
            validation={value => value.length >= 8}
            {...{errors, setErrors, wasSubmitted}}
        >Senha</InputStyled>
      </Grid>
      <Grid item sm={8}>
        <ButtonStyled onClick={() => sign()}>Entrar</ButtonStyled>
      </Grid>
      <Grid item sm={8}>
        <ButtonStyled onClick={() => history.push('/new-account')}>Criar Conta</ButtonStyled>
      </Grid>
    </Grid>
  </ModalStyled>
}