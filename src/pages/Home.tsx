import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import fetcher from "@/api/fetcher";
import { cityList } from "@/state/common";

const Home = () => {
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);
  const [randomCity, setRandomCity] = useState<string | null>(null);

  const getCityList = async () => {
    try {
      const res: any = await fetcher("get", "/data/citylist.json", {});
      if (res.data.length === 0) {
        console.log("no data");
      }
      setCities(res.data);
      console.log("newCities", res.data[0].name);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!cities || cities.length === 0) {
      getCityList();
    } else {
      const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)]?.name;
      setRandomCity(selectedRandomCity || null);
    }
  }, [cities]);

  console.log("randomCity", randomCity);

  return (
    <HomeContainer>
      {randomCity && (
        <Title>
          오늘 <TitleUnderlined>{randomCity}</TitleUnderlined> 의 날씨는?
        </Title>
      )}

      <CityListContainer>
        {cityList &&
          cities.map((city: any, id: number) => {
            return <CityListBox key={id}>{city.name}</CityListBox>;
          })}
      </CityListContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: 100vh;
  padding: 0 10em;
  overflow: scroll;
`;

const Title = styled.h1`
  margin: 4em;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

const TitleUnderlined = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const CityListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
  height: 100%;
  overflow: scroll;
`;

const CityListBox = styled.div`
  padding: 1em;
  background-color: lightgray;
  border-radius: 10px;
  cursor: pointer;
`;

export default Home;
