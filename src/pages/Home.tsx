import { useEffect } from "react";
import { useRecoilState } from "recoil";

import fetcher from "@/api/fetcher";
import { cityList } from "@/state/common";

const Home = () => {
  const [cities, setCities] = useRecoilState(cityList);

  const getCityList = async () => {
    const res: any = await fetcher("get", "/data/citylist.json", {});
    if (res.data.length === 0) {
      console.log("no data");
    }
    setCities(res.data);
    console.log("newCitys", res.data[0].name);
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {cityList &&
        cities.map((city: any, id: number) => {
          return <div key={id}>{city.name}</div>;
        })}
    </>
  );
};

export default Home;
