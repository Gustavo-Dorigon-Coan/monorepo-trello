import {Container, Grid} from "@mui/material";
import React, {useEffect} from "react";
import {ProjectService} from "../../../common/services/ProjectService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {CardProject} from "../../../common/components/CardProject/CardProject";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import {AuthService} from "../../../common/services/AuthService";
import {genericError} from "../../../common/utils/Functions";
import {PROJECTS_TYPE} from "../../../common/reducers/projectsState";
import {useDispatch, useSelector} from "react-redux";

export const loadProjects = async (dispatch) => {
  const response = await ProjectService.findByUserId(AuthService.getUser().id);
  if (HttpStatus.isOkRange(response?.status)) {
    dispatch({
      type: PROJECTS_TYPE,
      projects: response.data,
    });
  } else {
    genericError(dispatch, response);
  }
};

export const Projects = () => {
  const projects = useSelector((state) => state.projectsState.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProjects(dispatch);
  }, []);

  return Boolean(projects) && (
    <Container>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <SubTitle>Projetos</SubTitle>
        </Grid>
        {projects && projects.filter(project => !project.inbox).map(project => (
          <Grid item>
            <CardProject project={project}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}