import {Container, Grid} from "@mui/material";
import {Title} from "../../../common/components/Title/Title";
import { AppTitle } from "../../../common/constants/Constants";
import {NewProject} from "../../../common/components/NewProject/NewProject";
import {ButtonStyled} from "../../../common/components/Button/Button";
import {useState} from "react";

export const Header = () => {
   const [ openModalProject, setOpenModalProject] = useState(false);

   return <Container maxWidth={'100%'}>
      <Grid container spacing={3}>
         <Grid item lg={10}>
            <Title>{AppTitle}</Title>
         </Grid>
         <Grid item lg={2}>
            <ButtonStyled onClick={() => setOpenModalProject(true)}>Novo Projeto</ButtonStyled>
         </Grid>
      </Grid>
      <NewProject open={openModalProject} setOpen={setOpenModalProject}/>
   </Container>
}