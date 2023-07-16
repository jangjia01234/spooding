import { atom } from "recoil";

interface City {
  id: number;
  name: string;
}

interface Filtered {
  id: number;
  name: string;
}

interface Session {
  key: string;
  value: string;
}

interface History {
  id: number;
  keyword: string;
}

interface Weather {
  clouds: { all: number };
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: { country: string; sunrise: number; sunset: number; type: number };
  timezone: number;
  visibility: number;
  weather: [{ description: string; icon: string; id: number; main: string }];
  wind: { deg: number; gust: number; speed: number };
}

export const cityList = atom<City[]>({
  key: "cityList",
  default: [],
});

export const filteredCityList = atom<Filtered[]>({
  key: "filteredCityList",
  default: [],
});

export const searchInput = atom<string>({
  key: "searchInput",
  default: "",
});

export const searchSession = atom<Session[]>({
  key: "searchSession",
  default: [],
});

export const searchHistory = atom<History[]>({
  key: "searchHistory",
  default: [],
});

export const weatherInfo = atom<Weather | null>({
  key: "weather",
  default: null,
});

export const isOpen = atom<boolean>({
  key: "isOpen",
  default: false,
});
