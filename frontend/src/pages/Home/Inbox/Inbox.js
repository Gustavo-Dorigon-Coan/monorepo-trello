import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {ListContainer} from "../../Project/ListContainer/ListContainer";
import {horizontalScroll} from "../../../common/utils/Functions";
import {List} from "../../Project/List/List";
import {EDIT_LISTS_TYPE} from "../../../common/reducers/editListsState";
import {useDispatch, useSelector} from "react-redux";
import {loadProject} from "../../Project/Project";

export const Inbox = () => {
  const { project } = useSelector(store => store?.projectState);
  const projects = useSelector((state) => state?.projectsState.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    Boolean(projects[0]) && loadProject(dispatch, projects.filter(project => project.inbox)[0]?.id);
  },[projects]);

  let ctrlIsPressed = false;

  document.onkeydown = function(evt) {
    if (evt.keyCode === 16) {
      ctrlIsPressed = true;
    }
  };

  document.onkeyup = function(evt) {
    if (evt.keyCode === 16) {
      ctrlIsPressed = false;
    }
  };

  const openEditLists = () => {
    dispatch({
      type: EDIT_LISTS_TYPE,
      projectId: project?.id,
      open: true,
    })
  }

  return (
    <Container>
      <Grid container>
        <Grid item sm={8}>
          <SubTitle margin={'32px 0 0 0'}>Caixa de Entrada</SubTitle>
        </Grid>
        <Grid item sm={4} display={'flex'} justifyContent={"flex-end"}>
          <Button color={'success'} onClick={() => openEditLists()} startIcon={<FormatListBulletedIcon/>}>
            Listas
          </Button>
        </Grid>
      </Grid>
      <ListContainer onWheel={event => horizontalScroll(event, ctrlIsPressed)}>
        {Boolean(project?.listOfCards) && project?.listOfCards.map(listOfCard =>
          <List list={listOfCard}/>)}
      </ListContainer>
    </Container>
  );
};