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

export const weatherInfo = atom({
  key: "weather",
  default: {
    clouds: { all: 0 },
    coord: {
      lat: 0,
      lon: 0,
    },
    dt: 0,
    id: 0,
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: "",
    sys: {
      country: "",
      sunrise: 0,
      sunset: 0,
      type: 0,
    },
    timezone: 0,
    visibility: 0,
    weather: [
      {
        description: "",
        icon: "",
        id: 0,
        main: "",
      },
    ],
    wind: {
      deg: 0,
      gust: 0,
      speed: 0,
    },
  },
});
