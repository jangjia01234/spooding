import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { cityList, weatherInfo } from "@/state/common";

import LazyImage from "../lazyImages";

const Detail = () => {
  const { id } = useParams();
  const cities = useRecoilValue<any[]>(cityList);
  const weather = useRecoilValue(weatherInfo);

  const navigate = useNavigate();

  const city = cities.find((city) => city.id === Number(id));

  useEffect(() => {
    console.log("ID:", id);
    if (!city) {
      console.error("존재하지 않는 도시입니다.");
      navigate("/error404");
    }
  }, [id]);

  const setKoreanTime = (time: number) => {
    const date = new Date(time * 1000);
    const years = date.getFullYear();
    const months = date.getMonth();
    const days = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${years}년 ${months}월 ${days}일 ${hours}시 ${minutes}분`;
  };

  return (
    <DetailContainer>
      {(city || weather) && (
        <>
          <Title>{setKoreanTime(weather.dt)}</Title>
          <CityName>지금 {weather.name} 의 날씨예요</CityName>
          <CityTemperature>{weather.main.temp}°C</CityTemperature>
          <LazyImage src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />

          <Title>{weather.weather[0].description}</Title>
          <p>국가: {weather.sys.country}</p>
          <p>바람: {weather.wind.speed}m/s</p>
          <p>습도: {weather.main.humidity}%</p>
          <p>체감온도: {weather.main.feels_like}°C</p>
          <p>기압: {weather.main.pressure}hPa</p>
          <p>구름: {weather.clouds.all}%</p>
          <p>일출: {setKoreanTime(weather.sys.sunrise)} (KST)</p>
          <p>일몰: {setKoreanTime(weather.sys.sunset)} (KST)</p>
        </>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 10em;
  overflow: scroll;
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 600;
  margin: 1em 0;
`;

const CityName = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
  margin: 1em 0;
`;

const CityTemperature = styled.h2`
  font-size: 3.8em;
  font-weight: 800;
`;

export default Detail;
