import styled from "styled-components";

const Loading = () => {
  return <LoadingContainer>Loading...</LoadingContainer>;
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
  font-weight: 600;
`;

export default Loading;
