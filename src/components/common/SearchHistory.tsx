import { useRecoilState } from "recoil";
import styled from "styled-components";

import { isOpen, searchHistory } from "@/state/common";

const SearchHistory = () => {
  const [searchHistoryList, setSearchHistoryList] = useRecoilState<any[]>(searchHistory);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useRecoilState<boolean>(isOpen);

  const removeSearchHistory = (id: number) => {
    const updatedHistoryList = searchHistoryList.filter((history) => history.id !== id);
    setSearchHistoryList(updatedHistoryList);
    window.sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistoryList));
  };

  return (
    <>
      {isSearchHistoryOpen && (
        <HistoryContainer>
          <HistoryHeaderContainer>
            <Title>최근 검색어</Title>
            <CloseHistoryBox
              onClick={() => {
                setIsSearchHistoryOpen(false);
              }}
            >
              닫기
            </CloseHistoryBox>
          </HistoryHeaderContainer>

          <HistoryListContainer>
            {searchHistoryList &&
              searchHistoryList.map((history) => (
                <KeywordContainer key={history.id}>
                  <Keyword>{history.keyword}</Keyword>
                  <RemoveButton onClick={() => removeSearchHistory(history.id)}>삭제</RemoveButton>
                </KeywordContainer>
              ))}
            {searchHistoryList.length >= 0 && (
              <NoHistoryText>최근 검색 기록이 없습니다.</NoHistoryText>
            )}
          </HistoryListContainer>
        </HistoryContainer>
      )}
    </>
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

const CloseHistoryBox = styled.button`
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

const NoHistoryText = styled.span`
  font-size: 0.9em;
  font-weight: 500;
  opacity: 0.6;
`;

export default SearchHistory;
