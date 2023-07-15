import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingGif src='/images/loading_spinner.gif' />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
  font-weight: 600;
`;

const LoadingGif = styled.img``;

export default Loading;
