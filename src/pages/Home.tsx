import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import fetcher from "@/api/fetcher";
import CityList from "@/components/CityList";
import { PATH } from "@/constants";
import { cityList, weatherInfo } from "@/state/common";
import variables from "@/styles/variables";

import LazyImage from "../lazyImages";

const Home = () => {
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);
  const [randomCity, setRandomCity] = useState<any | null>(null);
  const [weather, setWeather] = useRecoilState(weatherInfo);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getCityList = async () => {
    const res: any = await fetcher("get", `/data/citylist.json`, {});
    if (res.data.length === 0) console.log("no data");
    else setCities(res.data);
  };

  const getWeather = async () => {
    try {
      if (randomCity && randomCity.coord) {
        const { lat, lon } = randomCity.coord;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;

        const cachedWeather = localStorage.getItem(randomCity.id.toString());
        if (cachedWeather) {
          setWeather(JSON.parse(cachedWeather));
        } else {
          const res: any = await fetcher("get", url, {});
          if (res.data.length === 0) {
            console.log("no data");
          } else {
            setWeather(res.data);
            localStorage.setItem(randomCity.id.toString(), JSON.stringify(res.data));
          }
        }
      }
    } catch (error) {
      console.error("날씨 정보를 받아오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    getCityList();
  }, []);

  useEffect(() => {
    const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)];
    setRandomCity(selectedRandomCity || null);
  }, [cities]);

  useEffect(() => {
    if (randomCity) {
      setLoading(true);
      getWeather();
    }
  }, [randomCity]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <HomeContainer>
      <TitleContainer>
        {!loading && (weather || randomCity) ? (
          <>
            <TodaysWeatherTitle>
              오늘
              <StyledLink to={`${PATH.DETAIL}/${randomCity?.id}`}>{randomCity?.name}</StyledLink>의
              날씨는?
            </TodaysWeatherTitle>
            {weather && (
              <RandomWeatherInfo>
                <TemperatureTitle>{weather.main.temp}°C</TemperatureTitle>
                <WeatherTitle>{weather.weather[0].description}</WeatherTitle>
                <LazyImage
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
              </RandomWeatherInfo>
            )}
          </>
        ) : !loading ? (
          <LoadingText>로딩중...</LoadingText>
        ) : null}
      </TitleContainer>
      <CityListTitleContainer>
        <CityListTitle>다양한 도시의 날씨를 살펴보세요</CityListTitle>
        <i className='fa-solid fa-chevron-down' />
      </CityListTitleContainer>
      <CityList />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  ${variables.flex("column", "center", "center")}
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  overflow: scroll;
`;

const TitleContainer = styled.div`
  ${variables.fontStyle("1.5em", 600)}
  margin: 6em 0 4em 0;
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

const RandomWeatherInfo = styled.div`
  margin-bottom: 7em;
`;

const TemperatureTitle = styled.h2`
  ${variables.fontStyle("3em", 800)}
  margin: 0.5em 0;
  color: ${({ theme }) => theme.color.orange};
  font-family: "Bagel Fat One", cursive;
`;

const WeatherTitle = styled.h4`
  margin: 0.5em 0;
`;

const LoadingText = styled.h2`
  ${variables.flex("row", "center", "center")}
  ${variables.fontStyle("1.2em", 600)}
  ${variables.widthHeight("100vw", "10em")}
  color: ${({ theme }) => theme.color.white};
  opacity: 0.4;
`;

const CityListTitleContainer = styled.div`
  ${variables.position("absolute", "null", "null", "5%", "null")}
  ${variables.flex("column", "center", "center")}

  i {
    margin-bottom: 1em;
    font-size: 1.6em;
    opacity: 0.5;
  }
`;

const CityListTitle = styled.h2`
  ${variables.fontStyle("1.2em", 600)}
  margin: 1em 0;
  text-align: center;
  white-space: nowrap;
`;

export default Home;
