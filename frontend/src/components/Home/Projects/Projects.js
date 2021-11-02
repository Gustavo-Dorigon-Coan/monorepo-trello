import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {ProjectService} from "../../../common/services/ProjectService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {CardProject} from "../../../common/components/CardProject/CardProject";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";

export const Projects = () => {
  const [projects, setProjects] = useState();

  const loadProjects = async () => {
    const response = await ProjectService.findByUserId(1);
    if (HttpStatus.isOkRange(response.status)) {
      setProjects(response.data);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return Boolean(projects) && (
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
  )
}