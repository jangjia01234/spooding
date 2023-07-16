import { useRecoilValue } from "recoil";

import { weatherInfo } from "@/state/common";

export const GetSubInfoData = () => {
  const weather = useRecoilValue(weatherInfo);

  const setKoreanTime = (time: number) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}시 ${minutes}분`;
  };

  const subInfoData = [
    { label: "날씨", value: weather.weather[0].description },
    { label: "국가", value: weather.sys.country },
    { label: "바람", value: `${weather.wind.speed}m/s` },
    { label: "습도", value: `${weather.main.humidity}%` },
    { label: "체감온도", value: `${weather.main.feels_like}°C` },
    { label: "기압", value: `${weather.main.pressure}hPa` },
    { label: "구름", value: `${weather.clouds.all}%` },
    { label: "일출", value: `${setKoreanTime(weather.sys.sunrise)} (KST)` },
    { label: "일몰", value: `${setKoreanTime(weather.sys.sunset)} (KST)` },
  ];

  return subInfoData;
};

export default GetSubInfoData;
