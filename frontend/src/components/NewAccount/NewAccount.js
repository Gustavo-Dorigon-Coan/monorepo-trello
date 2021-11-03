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

export const NewAccount = () => {
  const [ errors, setErrors] = useState();
  const [ user, setUser] = useState();
  const [ alert, setAlert] = useState({open: false});
  const history = useHistory();

  const sign = async () => {
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
            {...{errors, setErrors}}
          >Nome</InputStyled>
        </Grid>
        <Grid item lg={12}>
          <InputStyled
            setObject={setUser}
            object={user}
            name={'email'}
            type={'email'}
            validation={value => {
              const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              let b = re.test(value);
              console.log('Pietro',b)
              return b;
            }}
            {...{errors, setErrors}}
          >Email</InputStyled>
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