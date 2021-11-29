import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {SubTitle} from "../../../common/components/SubTitle/SubTitle";
import {EDIT_CARD_TYPE} from "../../../common/reducers/EditCardState";
import {CardStyled, Description, Title} from "../../Project/Card/styled";
import {useDispatch, useSelector} from "react-redux";
import {loadProject} from "../../Project/Project";
import {CardService} from "../../../common/services/CardService";
import {AuthService} from "../../../common/services/AuthService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {genericError} from "../../../common/utils/Functions";

export const ScheduledDays = () => {
  const projects = useSelector((state) => state?.projectsState.projects);
  const [ cardsToday, setCardsToday ] = useState([]);
  const [ cardsWeek, setCardsWeek ] = useState([]);
  const dispatch = useDispatch();

   async function getCardsNotConcluded(response) {
     let cards = [];
     for (const index in response?.data) {
       const card = response?.data[index];
       const responseList = await CardService.getList(card.id);
       cards = [...cards, {...card, list: responseList.data}];
     }
     return cards;
   }

  const loadCardsWeek = async () => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const nextDate = new Date(new Date().setDate(new Date().getDate() + 7));
    const query = {
      startDate: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
      endDate: nextDate.getFullYear() + '-' + String(nextDate.getMonth() + 1).padStart(2, '0') + '-' + String(nextDate.getDate()).padStart(2, '0')
    }
    const response = await CardService.find(AuthService.getUser()?.id, query);
    if (HttpStatus.isOkRange(response?.status)) {
      setCardsWeek(await getCardsNotConcluded(response));
    } else {
      genericError(dispatch, response);
    }
  }

  const loadCardsToday = async () => {
    const date = new Date();
    const query = {
      startDate: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
      endDate: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
    }
    const response = await CardService.find(AuthService.getUser()?.id, query);
    if (HttpStatus.isOkRange(response?.status)) {
      setCardsToday(await getCardsNotConcluded(response));
    } else {
      genericError(dispatch, response);
    }
  }

  useEffect(() => {
    Boolean(projects[0]) && loadProject(dispatch, projects.filter(project => project.inbox)[0]?.id);
    loadCardsToday();
    loadCardsWeek();
  },[projects]);

  const openCard = (card) => {
    dispatch({
      type: EDIT_CARD_TYPE,
      card: {...card, isScheduledDays: true, listOfCards: {id: 0}},
      open: true,
    })
  }

  const getDescription = (card) => {
    if (card?.description?.length > 25) {
      return card?.description.substring(0,25) + '...';
    }
    return card?.description;
  }

  const CardHome = (card) => {
    return (
      <CardStyled
        onClick={() => openCard(card.card)}
      >
        <Title>{card.card?.title}</Title>
        <Description>{getDescription(card.card)}</Description>
      </CardStyled>
    );
  }

  return (
    <Container>
      <Grid container>
        <Grid item sm={6} display={'flex'} direction={'column'} alignItems={'center'}>
          <SubTitle margin={'32px 0 0 0'}>Tarefas para Hoje</SubTitle>
        </Grid>
        <Grid item sm={6} display={'flex'} direction={'column'} alignItems={'center'}>
          <SubTitle margin={'32px 0 0 0'}>Tarefas para os proximos 7 dias</SubTitle>
        </Grid>
        <Grid item sm={6} display={'flex'} direction={'column'} alignItems={'center'}>
          {Boolean(cardsToday) && cardsToday.map(card => card.list.name !== 'Concluído' && <CardHome card={card} />)}
        </Grid>
        <Grid item sm={6} display={'flex'} direction={'column'} alignItems={'center'}>
          {Boolean(cardsWeek) && cardsWeek.map(card => card.list.name !== 'Concluído' && <CardHome card={card} />)}
        </Grid>
      </Grid>
    </Container>
  );
};