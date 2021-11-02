import {Home} from "../../components/Home/Home";
import styled from "styled-components";
import {Background} from "../../common/constants/Color";

const HomeContainer = styled.div`
  background-color: ${Background};
`

const HomePage = () => {
    return <HomeContainer><Home/></HomeContainer>
}

export { HomePage };