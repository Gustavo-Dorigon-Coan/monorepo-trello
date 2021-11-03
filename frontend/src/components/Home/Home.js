import {Header} from "./Header/Header";
import {Projects} from "./Projects/Projects";
import { AppTitlePage } from "../../common/constants/Constants";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";
import {useState} from "react";
import {NewProject} from "../../common/components/NewProject/NewProject";

const Home = () => {
  const [openModalProject, setOpenModalProject] = useState(false);
  document.title = AppTitlePage + 'Home';

  return <RestrictArea>
      <Header {...{setOpenModalProject}}/>
      <Projects reloadObserver={openModalProject}/>
      <NewProject open={openModalProject} setOpen={setOpenModalProject}/>
    </RestrictArea>;
}

export { Home };