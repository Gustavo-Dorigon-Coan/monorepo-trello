import {Grid} from "@mui/material";
import {InputStyled} from "../Input/Input";
import {ButtonStyled} from "../Button/Button";
import {SubTitle} from "../SubTitle/SubTitle";
import {ModalStyled} from "../Modal/Modal";
import {useState} from "react";
import {ProjectService} from "../../services/ProjectService";

export const NewProject = ({open, setOpen}) => {
  const [ errors, setErrors] = useState({name: false});
  const [ project, setProject] = useState({users: [{id: 1}]});

  const handleName = event => {
    setErrors({...errors, name: false});
    const name = event.target.value
    setProject({...project, name: name});
    if (name.length <= 0) {
      setErrors({...errors, name: true});
    }
  }

  const save = () => {
    if (!errors.name) {
      ProjectService.save(project);
      setOpen(false);
    }
  }

  return <ModalStyled open={open} closeButton={() => setOpen(false)}>
      <Grid container spacing={3}>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={6}>
            <SubTitle margin={'0 0 0 16px'}>Novo Projeto</SubTitle>
          </Grid>
        </Grid>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={12}>
            <InputStyled error={errors.name} onChange={event => handleName(event)} label="Nome do Projeto"/>
          </Grid>
          <Grid container item lg={12}>
            <Grid item lg={9}/>
            <Grid item lg={3}>
              <ButtonStyled onClick={() => save()}>Cadastrar</ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalStyled>
}