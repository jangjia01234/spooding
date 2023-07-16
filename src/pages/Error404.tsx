import { Link } from "react-router-dom";
import styled from "styled-components";

import variables from "@/styles/variables";

const Error404 = () => {
  return (
    <ErrorContainer>
      <ErrorTitle>404 Not Found</ErrorTitle>
      <Link to='/'>
        <BackToHome>홈으로</BackToHome>
      </Link>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.h1`
  ${variables.flex("column", "center", "center")}
  height: 80vh;
  margin: 4em;
  gap: 1em;
`;

const ErrorTitle = styled.h1`
  ${variables.fontStyle("3em", 600)}
  margin-bottom: 0.8em;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
`;

const BackToHome = styled.button`
  ${variables.fontStyle("1.5em", 600)}
  padding: 0.4em 0.6em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.lightGray}; ;
`;

export default Error404;
