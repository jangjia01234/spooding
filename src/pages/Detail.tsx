import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { cityList } from "@/state/common";

const Detail = () => {
  const { id } = useParams();
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);

  useEffect(() => {
    console.log("ID:", id);
  }, [id]);

  const city = cities.find((city) => city.id === Number(id));

  if (!city) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail</h1>
      <p>ID: {id}</p>
      {city && <p>NAME: {city.name}</p>}
    </div>
  );
};

export default Detail;
