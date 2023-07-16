import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import logo from "/icons/spooding_icon_black.png";
import { cityList, filteredCityList, searchHistory } from "@/state/commonState";
import variables from "@/styles/variables";

import SearchBar from "../SearchBar";
import SearchHistory from "./SearchHistory";

const Header = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);

  useEffect(() => {
    const getSessionData = (key: string) => {
      const sessionData = window.sessionStorage.getItem(key) || "[]";
      return JSON.parse(sessionData);
    };

    const historySessionData = getSessionData("searchHistory");
    const resultCitiesSessionData = getSessionData("resultCities");

    setSearchHistoryList(historySessionData);
    setFilteredCities(resultCitiesSessionData.length > 0 ? resultCitiesSessionData : cities);
  }, [cities, setSearchHistoryList, setFilteredCities]);

  return (
    <HeaderContainer>
      <GoToHome to='/'>
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
