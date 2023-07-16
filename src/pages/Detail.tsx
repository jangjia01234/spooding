import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { cityList, weatherInfo } from "@/state/common";
import variables from "@/styles/variables";

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
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}분 ${minutes}시`;
  };

  return (
    <DetailContainer>
      {(city || weather) && (
        <WeatherInfoContainer>
          <MainInfoSection>
            <CityTime>현재 {setKoreanTime(weather.dt)} 기준</CityTime>
            <CityName>
              <h4>{weather.name}</h4>
            </CityName>
            <CityTemperature>{weather.main.temp}°C</CityTemperature>
            <LazyImage
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <CityWeatherDescription>{weather.weather[0].description}</CityWeatherDescription>
          </MainInfoSection>
          <SubInfoSection>
            <SubInfoCard>
              날씨 <br />
              {weather.weather[0].description}
            </SubInfoCard>
            <SubInfoCard>
              국가 <br /> {weather.sys.country}
            </SubInfoCard>
            <SubInfoCard>
              바람 <br /> {weather.wind.speed}m/s
            </SubInfoCard>
            <SubInfoCard>
              습도 <br /> {weather.main.humidity}%
            </SubInfoCard>
            <SubInfoCard>
              체감온도 <br /> {weather.main.feels_like}°C
            </SubInfoCard>
            <SubInfoCard>
              기압 <br /> {weather.main.pressure}hPa
            </SubInfoCard>
            <SubInfoCard>
              구름 <br /> {weather.clouds.all}%
            </SubInfoCard>
            <SubInfoCard>
              일출 <br /> {setKoreanTime(weather.sys.sunrise)} (KST)
            </SubInfoCard>
            <SubInfoCard>
              일몰 <br /> {setKoreanTime(weather.sys.sunset)} (KST)
            </SubInfoCard>
          </SubInfoSection>
        </WeatherInfoContainer>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  ${variables.flex("column", "center", "center")};
  height: 92vh;
  overflow: hidden;
`;

const WeatherInfoContainer = styled.div`
  ${variables.flex("row", "center", "center")};
  height: 100%;
`;

const MainInfoSection = styled.div`
  ${variables.flex("column", "center", "center")};
  ${variables.widthHeight("30vw", "100%")};
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
`;

const SubInfoSection = styled(MainInfoSection)`
  ${variables.widthHeight("70vw", "100%")};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
`;

const SubInfoCard = styled.div`
  ${variables.flex("row", "center", "center")};
  ${variables.fontStyle("3em", 800)}
  padding: 0.8em;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.lightGray};

  &:hover {
    background-color: ${({ theme }) => theme.color.green};
  }
`;

const CityTime = styled.h2`
  ${variables.fontStyle("1em", 600)}
`;

const CityName = styled.h4`
  ${variables.fontStyle("2em", 600)}
  margin-top: 0.2em;
`;

const CityTemperature = styled.h2`
  ${variables.fontStyle("4.8em", 800)}
  margin: 0.2em 0;
  color: ${({ theme }) => theme.color.orange};
  font-family: "Bagel Fat One", cursive;
`;

const CityWeatherDescription = styled.h3`
  margin: 0.2em 0;
`;

export default Detail;
