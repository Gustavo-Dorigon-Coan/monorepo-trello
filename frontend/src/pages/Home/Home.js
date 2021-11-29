import {Header} from "./Header/Header";
import {Projects} from "./Projects/Projects";
import {AppTitlePage} from "../../common/constants/Constants";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";
import React from "react";
import {ScheduledDays} from "./ScheduledDays/ScheduledDays";
import {Inbox} from "./Inbox/Inbox";

const Home = () => {
  document.title = AppTitlePage + 'Home';

  return <RestrictArea>
    <Header/>
    <ScheduledDays />
    <Projects/>
    <Inbox />
  </RestrictArea>;
}

export { Home };