import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import logo from "/icons/spooding_icon_black.png";
import { cityList, filteredCityList, searchHistory, searchInput } from "@/state/common";

import SearchHistory from "./SearchHistory";

const Header = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [input, setInput] = useRecoilState<string>(searchInput);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // MARK: 검색 및 검색어 저장 기능
  const setValue = (e: any) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
  };

  const handleButtonClick = () => setIsButtonClicked(true);

  const showSearchResult = (e: any) => {
    e.preventDefault();

    if (input) {
      const result = cities.filter((city) => city.name.toLowerCase().includes(input));
      setFilteredCities(result);
      window.sessionStorage.setItem("resultCities", JSON.stringify(result));

      if (isButtonClicked) {
        const newHistory = [{ id: Date.now(), keyword: input }, ...searchHistoryList];
        setSearchHistoryList(newHistory);
        window.sessionStorage.setItem("searchHistory", JSON.stringify(newHistory));
        setIsButtonClicked(false);
      }
    } else {
      console.log("검색 결과가 없습니다.");
    }
  };

  // MARK: 새로고침해도 검색결과 유지하는 기능
  useEffect(() => {
    const searchHistorySession = window.sessionStorage.getItem("resultCities");
    const searchHistorySessionJSON = JSON.parse(searchHistorySession || "[]");
    if (searchHistorySessionJSON.length > 0) setFilteredCities(searchHistorySessionJSON);
    else setFilteredCities(cities);
  }, [cities, setFilteredCities]);

  return (
    <HeaderContainer>
      <GoToHome to={"/"}>
        <LogoImage src={logo} alt='spooding logo' />
        <LogoText>Spooding</LogoText>
      </GoToHome>
      <SearchContainer onSubmit={showSearchResult}>
        <SearchInput
          type='text'
          placeholder='도시명을 입력해 날씨, 기온, 습도 등을 알아보세요.'
          onChange={setValue}
        />
        <SearchButton type='submit' onClick={handleButtonClick}>
          <i className='fa-solid fa-magnifying-glass'></i>
        </SearchButton>
      </SearchContainer>
      <SearchHistory />
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
  position: absolute;
  right: 13.5em;
  width: 24em;
  height: 3em;
  padding: 0 2em;
  border: 2.5px solid #1d1d1d;
  border-radius: 10em;
  background-color: #a385df;

  &::placeholder {
    color: #1d1d1d88;
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 12.5em;
  bottom: 30%;
  margin-left: 1em;
  font-size: 1em;
  color: #1d1d1d;
  border-radius: 0.4em;
  outline: none;
`;

export default React.memo(Header);
