import { useRecoilState } from "recoil";
import styled from "styled-components";

import { searchHistory } from "@/state/common";

const SearchHistory = () => {
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);

  return (
    <HistoryContainer>
      <HistoryHeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText>전체삭제</RemoveText>
      </HistoryHeaderContainer>

      <HistoryListContainer>
        {searchHistoryList &&
          searchHistoryList.map((history) => (
            <KeywordContainer key={history.id}>
              <Keyword>{history.keyword}</Keyword>
              <RemoveButton>삭제</RemoveButton>
            </KeywordContainer>
          ))}
      </HistoryListContainer>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  position: absolute;
  top: 2.5em;
  right: 11.25em;
  padding: 2em 1em 1em 1em;
  width: 21.65em;
  background-color: #a385df;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  box-shadow: 0 0 0 2.5px #1d1d1d inset;
  z-index: -1;
`;

const HistoryHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

const Title = styled.h1``;

const RemoveText = styled.button`
  font-size: 0.9em;
  border-radius: 0.4em;
  outline: none;
`;

const HistoryListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const KeywordContainer = styled.li`
  overflow: hidden;
`;

const Keyword = styled.span``;

const RemoveButton = styled.button`
  margin-left: 1em;
  padding: 0.4em 0.8em;
  font-size: 0.9em;
  color: white;
  background-color: #1d1d1d;
  border-radius: 0.4em;
  outline: none;
`;

export default SearchHistory;
