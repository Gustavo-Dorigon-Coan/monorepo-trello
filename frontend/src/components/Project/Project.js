import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ListOfCardsService} from "../../common/services/ListOfCardsService";
import {SubTitle} from "../../common/components/SubTitle/SubTitle";
import {ProjectService} from "../../common/services/ProjectService";
import {Title} from "../../common/components/Title/Title";
import {AuthService} from "../../common/services/AuthService";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {genericError} from "../../common/utils/Functions";
import {AlertStyled} from "../../common/components/AlertStyled/AlertStyled";
import {Header} from "./Header/Header";
import {AppTitlePage} from "../../common/constants/Constants";
import {ListContainer} from "./ListContainer/ListContainer";
import {List} from "./List/List";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";

export const Project = () => {
  let { id } = useParams();
  const [ updatePage, setUpdatePage ] = useState(false);
  const [ project, setProject ] = useState();
  const [ alert, setAlert] = useState({open: false});

  document.title = AppTitlePage + 'Projeto';

  const loadProject = async () => {
    const response = await ProjectService.findById(id);
    if (HttpStatus.isOkRange(response?.status)) {
      setProject(response.data);
    } else {
      genericError(setAlert, alert, response);
    }
  }

  useEffect(() => {
    loadProject();
  },[updatePage]);

  return (
    <RestrictArea>
      <Header title={project?.name} />
        <ListContainer>
          {Boolean(project?.listOfCards) && project?.listOfCards.map(listOfCard =>
            <List
              updatePage={updatePage}
              setUpdatePage={setUpdatePage}
              list={listOfCard} />)}
        </ListContainer>
      <AlertStyled alert={alert} setAlert={setAlert}/>
    </RestrictArea>
  );
};