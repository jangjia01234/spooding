import { atom } from "recoil";

interface City {
  id: string;
  name: string;
}

export const cityList = atom<City[]>({
  key: "cityList",
  default: [],
});
