import styled from "styled-components";

import variables from "@/styles/variables";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingGif src='/images/loading_spinner.gif' />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  ${variables.flex("row", "center", "center")}
  ${variables.widthHeight("100%", "100vh")}
  ${variables.fontStyle("2em", 600)}
  color: ${({ theme }) => theme.color.white};
`;

const LoadingGif = styled.img`
  ${variables.widthHeight("50px", "50px")}
`;

export default Loading;
