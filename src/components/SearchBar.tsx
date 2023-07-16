import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { cityList, filteredCityList, isOpen, searchHistory, searchInput } from "@/state/common";

const SearchBar = () => {
  const cities = useRecoilValue<any[]>(cityList);
  const [input, setInput] = useRecoilState<string>(searchInput);
  const [filteredCities, setFilteredCities] = useRecoilState<any[]>(filteredCityList);
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useRecoilState<boolean>(isOpen);
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
        <i className='fa-solid fa-magnifying-glass'></i>
      </SearchButton>
    </SearchContainer>
  );
};

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
    color: #1d1d1d52;
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

export default SearchBar;
