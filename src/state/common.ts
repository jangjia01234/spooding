import { atom } from "recoil";

interface City {
  id: string;
  name: string;
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
