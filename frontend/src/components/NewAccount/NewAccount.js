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
import {AlertStyled} from "../../common/components/AlertStyled/AlertStyled";
import {AppTitlePage} from "../../common/constants/Constants";

export const NewAccount = () => {
  const [ errors, setErrors] = useState({password: true, username: true, email: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const [ user, setUser] = useState();
  const [ alert, setAlert] = useState({open: false});
  const history = useHistory();
  document.title = AppTitlePage + 'Criar Conta';

  const sign = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await AuthService.save(user);
      if (HttpStatus.isOkRange(response?.status)) {
        history.push('/');
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
          <SubTitle>Criar Conta</SubTitle>
        </Grid>
        <Grid item lg={12}>
          <InputStyled
            setObject={setUser}
            object={user}
            name={'username'}
            {...{errors, setErrors, wasSubmitted}}
          >Nome</InputStyled>
        </Grid>
        <Grid item lg={12}>
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
        <Grid item lg={12}>
          <InputStyled
            setObject={setUser}
            object={user}
            name={'password'}
            type={'password'}
            validation={value => value.length >= 8}
            {...{errors, setErrors, wasSubmitted}}
          >Senha</InputStyled>
        </Grid>
        <Grid item lg={8}>
          <ButtonStyled onClick={() => sign()}>Criar Conta</ButtonStyled>
        </Grid>
        <Grid item lg={8}>
          <ButtonStyled onClick={() => history.push('/login')}>Fazer Login</ButtonStyled>
        </Grid>
      </Grid>
    </ModalStyled>
    <AlertStyled alert={alert} setAlert={setAlert}/>
  </>
}