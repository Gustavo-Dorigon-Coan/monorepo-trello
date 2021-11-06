import {Container, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ProjectService} from "../../../common/services/ProjectService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {CardProject} from "../../../common/components/CardProject/CardProject";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import {AuthService} from "../../../common/services/AuthService";
import {genericError} from "../../../common/utils/Functions";
import {AlertStyled} from "../../../common/components/AlertStyled/AlertStyled";

export const Projects = ({reloadObserver}) => {
  const [projects, setProjects] = useState();
  const [ alert, setAlert] = useState({open: false});

  const loadProjects = async () => {
    const response = await ProjectService.findByUserId(AuthService.getUser().id);
    if (HttpStatus.isOkRange(response?.status)) {
      setProjects(response.data);
    } else {
      genericError(setAlert, alert, response);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [reloadObserver]);

  return Boolean(projects) && (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <SubTitle>Projetos</SubTitle>
          </Grid>
          {projects && projects.map(project => (
            <Grid item>
              <CardProject project={project}/>
            </Grid>
          ))}
        </Grid>
      </Container>
      <AlertStyled alert={alert} setAlert={setAlert}/>
    </>
  )
}