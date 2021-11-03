import {CircularProgress, Grid, Typography} from "@mui/material";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthService} from "../../services/AuthService";

const PageWidth = styled.div`
  height: calc(100vh - 32px);
  width: calc(100vw - 32px);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export const RestrictArea = ({children}) => {
  const [isLogged, setIsLogged] = useState();
  const history = useHistory();

  useEffect(() => {
    if (Boolean(isLogged)) {
      !isLogged?.isLogged && history.push('/login');
    }
  }, [isLogged, history]);

  useEffect( () => {
    validateToken();
  }, [])

  const validateToken = async () => {
    const isTokenValid = await AuthService.validateToken();
    if (isTokenValid.data) {
      setIsLogged({isLogged: true});
    } else {
      setIsLogged({isLogged: false});
    }
  }

  return Boolean(isLogged) && isLogged?.isLogged ? children : (
      <PageWidth>
        <Grid container direction="column" justify="flex-start" alignItems="center">
          <CircularProgress size={100} color={"secondary"}/>
          <Typography variant="h3" align="center" color="secondary">
            Carregando...
          </Typography>
        </Grid>
      </PageWidth>
  );
};