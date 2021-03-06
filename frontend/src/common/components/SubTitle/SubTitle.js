import styled from "styled-components";

export const SubTitle = styled.h2`
  font-size: 24px;
  padding: 8px 0px;
  margin: ${({margin}) => margin ? margin : 0};
  color: ${({color}) => color ? color : 0};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
`;