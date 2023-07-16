import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import logo from "/icons/spooding_icon_black.png";
import { cityList, filteredCityList, searchHistory } from "@/state/common";
import variables from "@/styles/variables";

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
  ${variables.position("fixed", "0", "null", "null", "null")}
  ${variables.flex("row", "space-between", "center")}
  ${variables.widthHeight("100%", "38px")}
  padding: 15px 40px;
  font-weight: bold;
  border-bottom: 3.5px solid ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.purple};
  z-index: 99;
`;

const GoToHome = styled(Link)`
  ${variables.flex("row", "null", "center")}
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 20px;
`;

const LogoText = styled.span`
  margin-left: 8px;
`;

export default React.memo(Header);
