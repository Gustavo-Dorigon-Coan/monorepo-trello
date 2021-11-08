import {ModalStyled} from "../../common/components/ModalStyled/ModalStyled";
import {Grid} from "@mui/material";
import {InputStyled} from "../../common/components/InputStyled/InputStyled";
import {ButtonStyled} from "../../common/components/Button/Button";
import {SubTitle} from "../../common/components/SubTitle/SubTitle";
import React, {useState} from "react";
import {genericError, verifyErrors} from "../../common/utils/Functions";
import {AuthService} from "../../common/services/AuthService";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {useHistory} from "react-router-dom";
import {AppTitlePage} from "../../common/constants/Constants";
import {useDispatch} from "react-redux";
import {ALERT_TYPE} from "../../common/reducers/alertState";

export const NewAccount = () => {
  const [ errors, setErrors] = useState({password: true, username: true, email: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const [ user, setUser] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  document.title = AppTitlePage + 'Criar Conta';

  const sign = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await AuthService.save(user);
      if (HttpStatus.isOkRange(response?.status)) {
        history.push('/');
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
        <SubTitle>Criar Conta</SubTitle>
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
          name={'email'}
          type={'email'}
          validation={value => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
          }}
          {...{errors, setErrors, wasSubmitted}}
        >Email</InputStyled>
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
        <ButtonStyled onClick={() => sign()}>Criar Conta</ButtonStyled>
      </Grid>
      <Grid item sm={8}>
        <ButtonStyled onClick={() => history.push('/login')}>Fazer Login</ButtonStyled>
      </Grid>
    </Grid>
  </ModalStyled>
}