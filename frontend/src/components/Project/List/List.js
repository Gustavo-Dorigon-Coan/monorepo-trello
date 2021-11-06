import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {COLORS} from "../../../common/constants/Color";
import {CardService} from "../../../common/services/CardService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import Card from "../Card/Card";

const ListStyled = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  margin-left: 16px;
  min-height: 30px;
`;

const Drop = styled.div`
  height: 500px;
`;

const Header = styled.div`
  width: calc(100% - 8px);
  display: flex;
  flex-direction: row;
  padding: 4px;
  margin: 0;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: ${COLORS.Green};
  margin: 8px 0;
`;

export const List = ({list, updatePage, setUpdatePage}) => {

  const setListDrop = () => {
    sessionStorage.setItem('listDropId', list.id);
  };

  return (
    <ListStyled>
      <Header>
        <Title>{list.name}</Title>
      </Header>
      <Drop
        onDragOver={() => setListDrop()}
      >
        {Boolean(list.cards) && list.cards.map(card => <Card updatePage={updatePage} setUpdatePage={setUpdatePage} card={card} />)}
      </Drop>
    </ListStyled>
  );
};