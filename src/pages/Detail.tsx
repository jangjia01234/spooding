import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { cityList } from "@/state/common";

const Detail = () => {
  const { id } = useParams();
  const [cities, setCities] = useRecoilState<any[]>(cityList as any);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID:", id);
    const city = cities.find((city) => city.id === Number(id));
    if (!city) {
      console.error("존재하지 않는 도시입니다.");
      navigate("/error404");
    }
  }, [id]);

  const city = cities.find((city) => city.id === Number(id));

  return (
    <div>
      <h1>Detail</h1>
      <p>ID: {id}</p>
      {city && <p>NAME: {city.name}</p>}
    </div>
  );
};

export default Detail;
