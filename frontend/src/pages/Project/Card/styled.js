import styled from "styled-components";
import {COLORS} from "../../../common/constants/Color";

export const CardStyled = styled.div`
  width: 220px;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 8px 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  background: ${COLORS.BackgroundCard};

  :hover {
    background: ${COLORS.BackgroundIten};
  }
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.Light};
  margin: 4px 0;
`;

export const Description = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: ${COLORS.Light};
  margin: 8px 0 0 0;
`;