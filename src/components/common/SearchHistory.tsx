import { useRecoilState } from "recoil";
import styled from "styled-components";

import { isOpen, searchHistory } from "@/state/common";
import variables from "@/styles/variables";

const SearchHistory = () => {
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useRecoilState<boolean>(isOpen);

  const removeSearchHistory = (id: number) => {
    setSearchHistoryList((prevHistoryList) =>
      prevHistoryList.filter((history) => history.id !== id),
    );
  };

  if (!isSearchHistoryOpen) return null;

  return (
    <HistoryContainer>
      <HistoryHeaderContainer>
        <h1>최근 검색어</h1>
        <CloseHistoryBox onClick={() => setIsSearchHistoryOpen(false)}>닫기</CloseHistoryBox>
      </HistoryHeaderContainer>

      <HistoryListContainer>
        {searchHistoryList.length ? (
          searchHistoryList.map((history) => (
            <KeywordContainer key={history.id}>
              <Keyword>{history.keyword}</Keyword>
              <RemoveButton onClick={() => removeSearchHistory(history.id)}>
                <i className='fa-solid fa-x' />
              </RemoveButton>
            </KeywordContainer>
          ))
        ) : (
          <NoHistoryText>최근 검색 기록이 없습니다.</NoHistoryText>
        )}
      </HistoryListContainer>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  ${variables.position("absolute", "2.5em", "11.25em", "null", "null")}
  padding: 2em 1em 1em 1em;
  width: 21.65em;
  background-color: ${({ theme }) => theme.color.lightPurple};
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  box-shadow: 0 0 0 2.5px ${({ theme }) => theme.color.black} inset;
  z-index: -1;
`;

const HistoryHeaderContainer = styled.div`
  ${variables.flex("row", "space-between", "center")}
  margin-bottom: 1em;
`;

const CloseHistoryBox = styled.button`
  margin-top: 0.5em;
  font-size: 0.9em;
  border-radius: 0.4em;
`;

const HistoryListContainer = styled.ul`
  ${variables.flex("column", "center", "space-between")}
`;

const KeywordContainer = styled.li`
  ${variables.flex("row", "space-between", "null")}
  width: 100%;
  margin: 0.2em 0;
  overflow: hidden;
`;

const Keyword = styled.span`
  ${variables.fontStyle("0.9em", 400)}
`;

const RemoveButton = styled.button`
  margin-left: 1em;
  font-size: 0.9em;
  color: ${({ theme }) => theme.color.black};
  border-radius: 0.4em;
  outline: none;
`;

const NoHistoryText = styled.span`
  ${variables.fontStyle("0.9em", 500)}
  opacity: 0.6;
`;

export default SearchHistory;
