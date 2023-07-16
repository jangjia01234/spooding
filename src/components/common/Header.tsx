import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import logo from "/icons/spooding_icon_black.png";
import { cityList, filteredCityList, searchInput } from "@/state/common";

const Header = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [input, setInput] = useRecoilState<string>(searchInput);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);

  // MARK: 검색 기능
  const getValue = (e: any) => {
    if (e.target.value) {
      setInput(e.target.value.toLowerCase());
    }
  };

  const showSearchResult = (e: any) => {
    e.preventDefault();

    if (input) {
      const result = cities.filter((city) => city.name.toLowerCase().includes(input));
      setFilteredCities(result);
      window.sessionStorage.setItem("resultCities", JSON.stringify(result));
    } else {
      console.log("검색 결과가 없습니다.");
    }
  };

  // MARK: 새로고침해도 검색결과 유지하는 기능
  useEffect(() => {
    const searchResultSession = window.sessionStorage.getItem("resultCities");
    const searchResultSessionJSON = JSON.parse(searchResultSession || "[]");
    if (searchResultSessionJSON.length > 0) {
      setFilteredCities(searchResultSessionJSON);
    } else {
      setFilteredCities(cities);
    }
  }, [cities, setFilteredCities]);

  console.log("filteredCities1", filteredCities);

  return (
    <HeaderContainer>
      <GoToHome to={"/"}>
        <LogoImage src={logo} alt='logo' />
        <LogoText>Spooding</LogoText>
      </GoToHome>
      <SearchContainer onSubmit={showSearchResult}>
        <SearchInput
          type='text'
          placeholder='도시명을 입력해 날씨, 기온, 습도 등을 알아보세요.'
          onChange={getValue}
        />
        <SearchButton type='submit' onClick={showSearchResult}>
          <i className='fa-solid fa-magnifying-glass'></i>
        </SearchButton>
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
  padding: 15px 40px;
  border-bottom: 3.5px solid #1d1d1d;
  font-weight: bold;
  background-color: #8559e0;
  z-index: 99;
`;

const GoToHome = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 20px;
`;

const LogoText = styled.span`
  bottom: 8px;
  margin-left: 8px;
`;

const SearchContainer = styled.form`
  display: flex;
  margin-right: 5em;
  width: 30em;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 72%;
  height: 100%;
  padding: 0 2em;
  border: 2.5px solid #1d1d1d;
  border-radius: 10em;
  background-color: transparent;

  &::placeholder {
    color: #1d1d1d88;
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 13.5em;
  bottom: 30%;
  margin-left: 1em;
  font-size: 1em;
  color: #1d1d1d;
  border-radius: 0.4em;
  outline: none;
`;

export default React.memo(Header);
