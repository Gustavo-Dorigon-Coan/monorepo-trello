import {Header} from "./Header/Header";
import {Projects} from "./Projects/Projects";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";
import {useState} from "react";
import {NewProject} from "../../common/components/NewProject/NewProject";

const Home = () => {
  const [openModalProject, setOpenModalProject] = useState(false);

    return (<RestrictArea>
      <Header {...{setOpenModalProject}}/>
      <Projects reloadObserver={openModalProject}/>
      <NewProject open={openModalProject} setOpen={setOpenModalProject}/>
    </RestrictArea>);
}

export { Home };