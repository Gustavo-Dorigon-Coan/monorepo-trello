import styled from "styled-components";

export const Title = styled.h1`
  font-size: 30px;
  padding: 8px 0px;
  color: ${({color}) => color && color};
  margin: ${({margin}) => margin ? margin : 0};
`;