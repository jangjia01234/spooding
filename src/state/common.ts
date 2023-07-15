import { atom, selector } from "recoil";

interface City {
  id: string;
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

export const searchInput = atom<string>({
  key: "searchInput",
  default: "",
});

export const filteredCityList = atom<City[]>({
  key: "filteredCityList",
  default: [],
});

export const searchSession = atom<Session[]>({
  key: "searchSession",
  default: [],
});
