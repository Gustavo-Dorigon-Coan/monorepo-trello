import styled from "styled-components";
import {COLORS} from "../../constants/Color";

export const ContainerComments = styled.div`
  max-height: 300px;
  width: 100%;
  max-width: 1100px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
  border-radius: 6px;
  background: ${COLORS.BackgroundIten};
`;

export const Comments = styled.div`
  width: fit-content;
  max-width: calc(100% - 24px);
  word-break: normal;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 6px 0;
  padding: 12px;
  border-radius: 6px;
  background: ${COLORS.BackgroundCard};
`;
export const ContainerDate = styled.div`
  width: calc(100% - 24px);
  word-break: normal;
  margin: 2px 0 12px 6px;
  color: ${COLORS.ContrastLight};
`;