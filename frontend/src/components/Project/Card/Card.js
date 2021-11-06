import React, {useEffect} from 'react';
import styled from "styled-components";
import {COLORS} from "../../../common/constants/Color";
import {CardService} from "../../../common/services/CardService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {Checkbox} from "@mui/material";

const CadStyled = styled.div`
  width: calc(100% - 16px);
  min-height: 30px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  background: ${COLORS.BackgroundCard};
  
  :hover {
    background: ${COLORS.BackgroundIten};
    transform: scale(1.02);
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.Light};
  margin: 4px 8px;
`;

const Description = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: ${COLORS.Light};
  margin: 8px 0 0 8px;
`;

const Card = ({card, setUpdatePage, updatePage}) => {

  const getDescription = () => {
    if (card?.description.length > 32) {
      return card?.description.substring(0,32) + '...';
    }
    return card?.description;
  }

  const setNextList = async () => {
    const response = await CardService.setNextList(card.id, {id: sessionStorage.getItem('listDropId')});
    if (HttpStatus.isOkRange(response?.status)) {
      setUpdatePage(!updatePage);
    }
  }
    useEffect(() => {
      console.log('Pietro',card)
    },[]);

  return (
    <CadStyled draggable={true} onDragEnd={() => setNextList()}>
      <Title>{card?.title}</Title>
      <Description>{getDescription()}</Description>
    </CadStyled>
  );
};

export default Card;