import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import logo from "/icons/spooding_icon_black.png";
import { cityList, filteredCityList, searchHistory } from "@/state/common";

import SearchBar from "../SearchBar";
import SearchHistory from "./SearchHistory";

const Header = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);

  useEffect(() => {
    const searchHistorySession = window.sessionStorage.getItem("searchHistory");
    const searchHistorySessionJSON = JSON.parse(searchHistorySession || "[]");
    if (searchHistorySessionJSON.length > 0) {
      setSearchHistoryList(searchHistorySessionJSON);
    }
  }, [setSearchHistoryList]);

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
      <SearchBar />
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

export default React.memo(Header);
