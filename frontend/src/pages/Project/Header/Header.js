import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {COLORS} from "../../../common/constants/Color";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {EDIT_LISTS_TYPE} from "../../../common/reducers/editListsState";
import {useDispatch} from "react-redux";
import {EditProject} from "../../../common/components/EditProject/EditProject";
import {useState} from "react";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  background: ${COLORS.BackgroundIten};
`;

export const ButtonsContainer = styled.div`
  margin: auto;
  margin-right: 16px;
  right: 0;
`;

export const Header = ({project}) => {
  const [ openEdit, setOpenEdit ] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const openEditLists = () => {
    dispatch({
      type: EDIT_LISTS_TYPE,
      projectId: project?.id,
      open: true,
    })
  }

  return <Container>
    <Button color={'success'} onClick={() => history.push('/')}>
      <ArrowBackIcon color={COLORS.White}/>
    </Button>
    <SubTitle margin={'8px 0 0 16px'} color={COLORS.Light}>{project?.name}</SubTitle>
    <ButtonsContainer>
      <Button color={'success'} onClick={() => openEditLists()} startIcon={<FormatListBulletedIcon />}>
        Listas
      </Button>
      <Button color={'success'} onClick={() => setOpenEdit(true)} startIcon={<ModeEditIcon />}>
        Editar
      </Button>
    </ButtonsContainer>
    <EditProject open={openEdit} setOpen={setOpenEdit} oldProject={project} />
  </Container>
}