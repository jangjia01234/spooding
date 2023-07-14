import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import fetcher from "@/api/fetcher";
import { PATH } from "@/constants";
import { cityList } from "@/state/common";

const Home = () => {
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);
  const [randomCity, setRandomCity] = useState<any | null>(null);

  const getCityList = async () => {
    try {
      const res: any = await fetcher("get", `/data/citylist.json`, {});

      if (res.data.length === 0) console.log("no data");
      else setCities(res.data);

      // console.log("newCities", res.data[0].name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (!cities || cities.length === 0) {
        getCityList();
      } else {
        const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)];
        setRandomCity(selectedRandomCity || null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [cities]);

  console.log("randomCity", randomCity);

  return (
    <HomeContainer>
      <TitleContainer>
        오늘
        {randomCity && (
          <StyledLink to={`${PATH.DETAIL}/${randomCity?.id}`}>{randomCity?.name}</StyledLink>
        )}
        의 날씨는?
      </TitleContainer>

      <CityListContainer>
        {cityList &&
          cities.map((city: any, id: number) => {
            return (
              <Link key={id} to={`${PATH.DETAIL}/${city.id}`}>
                <CityListBox>{city.name}</CityListBox>
              </Link>
            );
          })}
      </CityListContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 10em;
  overflow: scroll;
`;

const TitleContainer = styled.div`
  margin: 4em 2em;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  margin: 0 0.5em;
  text-decoration: underline;
`;

const CityListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-gap: 1em;
  height: 100%;
  overflow: scroll;
`;

const CityListBox = styled.div`
  padding: 1em;
  background-color: #ececec;
  border-radius: 10px;
  cursor: pointer;
`;

export default Home;
