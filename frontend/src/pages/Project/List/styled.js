import styled from "styled-components";
import {COLORS} from "../../../common/constants/Color";

export const ListStyled = styled.div`
  width: 250px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 121px);
  border-radius: 8px;
  padding: 8px;
  margin: 8px 2px;
  min-height: 30px;
`;

export const DropList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Header = styled.div`
  width: 228px;
  display: flex;
  flex-direction: row;
  padding: 4px;
  margin: 0;
  border-bottom: 1px solid ${({color}) => color ? color : COLORS.Green};
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 20px;
  width: 100%;
  font-weight: 500;
  color: ${({color}) => color ? color : COLORS.Green};
  margin: 8px 0;
`;

export const GhostCard = styled.div`
  width: 220px;
  min-height: 66px;
  display: ${({open}) => open ? 'flex' : 'none'};
  flex-direction: column;
  border-radius: 4px;
  padding: 0 8px;
  margin: 8px 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.25);
`;