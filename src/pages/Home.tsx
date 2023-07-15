import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import fetcher from "@/api/fetcher";
import { PATH } from "@/constants";
import { cityList, searchSession } from "@/state/common";

const CityListComponent = () => {
  const [cities, setCities] = useRecoilState<any[]>(cityList);
  const searchResult = useRecoilValue<any[]>(searchSession);

  console.log("도시 목록:", cities);
  console.log("검색 결과:", searchResult);

  return (
    <CityListContainer>
      {cities.length > 0 ? (
        cities.map((city: any, id: number) => (
          <Link key={id} to={`${PATH.DETAIL}/${city.id}`}>
            <CityListBox>{city.name}</CityListBox>
          </Link>
        ))
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </CityListContainer>
  );
};

const Home = () => {
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);
  const [randomCity, setRandomCity] = useState<any | null>(null);
  const [weather, setWeather] = useState<any | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // MARK: 도시 리스트 받아오기
  const getCityList = async () => {
    const res: any = await fetcher("get", `/data/citylist.json`, {});
    if (res.data.length === 0) console.log("no data");
    else setCities(res.data);
  };

  // MARK: 날씨 정보 받아오기
  const getWeather = async () => {
    try {
      if (randomCity && randomCity.coord) {
        const { lat, lon } = randomCity.coord;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;

        console.log("url", url);

        const res: any = await fetcher("get", url, {});
        if (res.data.length === 0) console.log("no data");
        else {
          setWeather(res.data);
          console.log("weather:", res.data);
        }
      }
    } catch {
      console.error("날씨 정보를 받아오지 못했습니다.");
    }
  };

  useEffect(() => {
    getCityList();
  }, []);

  // MARK: 랜덤 도시 받아오기
  useEffect(() => {
    const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)];
    setRandomCity(selectedRandomCity || null);
  }, [cities]);

  // MARK: 날씨 정보 받아오기
  useEffect(() => {
    if (randomCity) {
      getWeather();
    }
  }, [randomCity]);

  return (
    <HomeContainer>
      <TitleContainer>
        {(weather || randomCity) && (
          <>
            <TodaysWeatherTitle>
              오늘
              <StyledLink to={`${PATH.DETAIL}/${randomCity?.id}`}>{randomCity?.name}</StyledLink>의
              날씨는?
            </TodaysWeatherTitle>
            {weather && (
              <>
                <TemperatureTitle>{weather.main.temp}°C</TemperatureTitle>
                <WeatherTitle>{weather.weather[0].description}</WeatherTitle>
                <img
                  alt='weather icon'
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
              </>
            )}
          </>
        )}
      </TitleContainer>
      <CityListComponent />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  padding: 0 10em;
  background-color: white;
  overflow: scroll;
`;

const TitleContainer = styled.div`
  margin: 6em 0 4em 0;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
`;

const TodaysWeatherTitle = styled.div`
  margin-bottom: 1em;
`;

const StyledLink = styled(Link)`
  margin: 0 0.4em;
  font-weight: 700;
  text-decoration: underline;
`;

const TemperatureTitle = styled.h2`
  margin: 0.5em 0;
  font-size: 2.5em;
  font-weight: 700;
`;

const WeatherTitle = styled.h4``;

const CityListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  height: 100%;
  overflow: scroll;
`;

const CityListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 1em;
  font-size: 1.2em;
  text-align: center;
  background-color: #f2f4f6;
  border-radius: 14px;
  cursor: pointer;

  &:hover {
    background-color: #fdf3e3;
    color: #d58d3f;
  }
`;

export default Home;
