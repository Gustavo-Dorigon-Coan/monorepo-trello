import {Header} from "./Header/Header";
import {Projects} from "./Projects/Projects";
import { AppTitlePage } from "../../common/constants/Constants";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";

const Home = () => {
  document.title = AppTitlePage + 'Home';

  return <RestrictArea>
      <Header/>
      <Projects/>
    </RestrictArea>;
}

export { Home };