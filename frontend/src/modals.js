import {NewCard} from "./common/components/NewCard/NewCard";
import React from "react";
import {EditLists} from "./common/components/EditLists/EditLists";
import {EditCard} from "./common/components/EditCard/EditCard";

export const Modals = () => {
  return <>
    <NewCard />
    <EditCard />
    <EditLists/>
  </>
}