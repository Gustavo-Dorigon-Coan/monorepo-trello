import {Home} from "../../components/Home/Home";
import styled from "styled-components";
import {COLORS} from "../../common/constants/Color";

const HomeContainer = styled.div`
  background-color: ${COLORS.Background};
`

const HomePage = () => {
    return <HomeContainer>
        <Home/>
    </HomeContainer>
}

export { HomePage };