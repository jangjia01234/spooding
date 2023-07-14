import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "/thumbnail.png";

const Header = () => {
  return (
    <HeaderContainer>
      <GoToHome to={"/"}>
        <LogoImage src={logo} alt='logo' />
        <LogoText>Logo Text</LogoText>
      </GoToHome>
      <SearchContainer>
        <SearchInput placeholder='도시를 검색해주세요.' />
        <SearchButton type='button'>검색</SearchButton>
      </SearchContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 0.8em;
  border-bottom: 1.5px solid #ececec;
  font-weight: bold;
  z-index: 99;
  opacity: 0.95;
`;

const GoToHome = styled(Link)`
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 30px;
`;

const LogoText = styled.span`
  position: relative;
  bottom: 8px;
  margin-left: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-right: 5em;
  width: 30em;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 85%;
  height: 100%;
  padding: 0 1.5em;
  border: none;
  border-radius: 0.4em;
  background-color: #ececec;
`;

const SearchButton = styled.button`
  width: 15%;
  height: 100%;
  margin-left: 1em;
  border: none;
  border-radius: 0.4em;
  background-color: #ececec;
`;

export default Header;
