import { Link } from "react-router-dom";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: 4em;
  gap: 1em;
`;

const ErrorTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

const BackToHome = styled.button`
  padding: 0.4em 0.6em;
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 10px;
  background-color: lightgray;
`;

export default Error404;
