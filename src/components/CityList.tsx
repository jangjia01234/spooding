import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { PATH } from "@/constants";
import { filteredCityList } from "@/state/commonState";
import variables from "@/styles/variables";

const CityList = () => {
  const filteredCities = useRecoilValue<any[]>(filteredCityList);

  return (
    <CityListContainer>
      {filteredCities.length > 0 ? (
        filteredCities.map((city: any) => (
          <CityListItem key={city.id} to={`${PATH.DETAIL}/${city.id}`}>
            {city.name}
          </CityListItem>
        ))
      ) : (
        <NoDataText>검색 결과가 없습니다.</NoDataText>
      )}
    </CityListContainer>
  );
};

const CityListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  overflow: scroll;
`;

const CityListItem = styled(Link)`
  ${variables.flex("row", "center", "center")}
  ${variables.fontStyle("1.2em", 600)}
  height: 150px;
  padding: 1em;
  color: ${({ theme }) => theme.color.black};
  text-align: center;
  background-color: ${({ theme }) => theme.color.gray};
  border: 2px solid ${({ theme }) => theme.color.black};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.orange};
  }
`;

const NoDataText = styled.h2`
  ${variables.flex("row", "center", "center")}
  ${variables.fontStyle("1.2em", 600)}
  ${variables.widthHeight("100vw", "10em")}
  color: ${({ theme }) => theme.color.white};
  opacity: 0.4;
`;

export default CityList;
