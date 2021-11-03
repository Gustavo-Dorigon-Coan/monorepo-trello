import styled from "styled-components";
import {COLORS} from "../../constants/Color";
import {SubTitle} from "../SubTitle/SubTitle";

const Container = styled.div`
  width: 238px;
  height: 90px;
  background-color: ${COLORS.Light};
  background-image: linear-gradient(140deg, ${COLORS.Light} 0%, ${COLORS.ContrastLight} 100%);
  color: ${COLORS.Background};
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;

  :hover {
    background: ${COLORS.Light};
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.63);
    transform: scale(1.03);
  }

  :active {
    background: ${COLORS.White};
  }
`

export const CardProject = ({project}) => {
  return <Container>
    <SubTitle>{project.name}</SubTitle>
  </Container>
}