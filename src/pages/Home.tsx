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
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [weather, setWeather] = useState<any | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  // MARK: 도시 리스트 받아오기
  const getCityList = async () => {
    const res: any = await fetcher("get", `/data/citylist.json`, {});
    if (res.data.length === 0) console.log("no data");
    else setCities(res.data);
  };

  // MARK: 현위치 (위도, 경도) 받아오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLat(latitude);
      setLon(longitude);
    });
  };

  // MARK: 위도, 경도를 url 파라미터로 넣어 날씨 정보 받아오기
  const getWeather = async () => {
    if (lat && lon) {
      const res: any = await fetcher("get", url, {});
      if (res.data.length === 0) console.log("no data");
      else {
        setWeather(res.data);
        console.log("weather:", weather.weather[0].description);
      }
    }
  };

  // MARK: 도시, 위도, 경도 정보가 변경될 때마다 렌더링.
  useEffect(() => {
    // MARK: 도시 리스트 및 랜덤 도시 받아오기
    if (!cities || cities.length === 0) getCityList();
    else {
      const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)];
      setRandomCity(selectedRandomCity || null);
    }

    // MARK: 현위치 받은 이후 날씨 받기
    const fetchData = async () => {
      getCurrentLocation();
      console.log("현재 위치:", lat, lon);

      await getWeather();
    };

    fetchData();
  }, [cities, lat, lon]);

  return (
    <HomeContainer>
      <TitleContainer>
        {weather && randomCity && (
          <>
            <TodaysWeatherTitle>
              오늘
              <StyledLink to={`${PATH.DETAIL}/${randomCity?.id}`}>{randomCity?.name}</StyledLink>의
              날씨는?
            </TodaysWeatherTitle>
            <TemperatureTitle>{weather.main.temp}°C</TemperatureTitle>
            <WeatherTitle>{weather.weather[0].main}</WeatherTitle>
          </>
        )}
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
