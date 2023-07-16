import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import {
  cityList,
  filteredCityList,
  isOpen,
  searchHistory,
  searchInput,
} from "@/state/commonState";
import variables from "@/styles/variables";

const SearchBar = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [input, setInput] = useRecoilState<string>(searchInput);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useRecoilState<boolean>(isOpen);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
  };

  const handleButtonClick = () => setIsButtonClicked(true);

  const showSearchResult = (e: React.FormEvent) => {
    e.preventDefault();

    if (input) {
      const result = cities.filter((city) => city.name.toLowerCase().includes(input));
      setFilteredCities(result);

      if (isButtonClicked) {
        const newHistory = [{ id: Date.now(), keyword: input }, ...searchHistoryList];
        setSearchHistoryList(newHistory);
        setIsButtonClicked(false);

        window.sessionStorage.setItem("resultCities", JSON.stringify(result));
        window.sessionStorage.setItem("searchHistory", JSON.stringify(newHistory));
      }
    }
  };

  const showSearchHistory = () => setIsSearchHistoryOpen(true);

  return (
    <SearchContainer onSubmit={showSearchResult}>
      <SearchInput
        type='text'
        placeholder='도시명을 입력해 날씨, 기온, 습도 등을 알아보세요.'
        onChange={setValue}
        onClick={showSearchHistory}
      />
      <SearchButton type='submit' onClick={handleButtonClick}>
        <i className='fa-solid fa-magnifying-glass' />
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.form`
  ${variables.widthHeight("30em", "100%")}
  display: flex;
  margin-right: 5em;
`;

const SearchInput = styled.input`
  ${variables.position("absolute", "null", "13.5em", "null", "null")}
  ${variables.widthHeight("24em", "3em")}
  padding: 0 2em;
  border: 2.5px solid ${({ theme }) => theme.color.black};
  border-radius: 10em;
  background-color: ${({ theme }) => theme.color.lightPurple};

  &::placeholder {
    color: ${({ theme }) => theme.color.black};
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  ${variables.position("absolute", "null", "12.5em", "30%", "null")}
  margin-left: 1em;
  font-size: 1em;
  color: ${({ theme }) => theme.color.black};
  border-radius: 0.4em;
  outline: none;
`;

export default SearchBar;
