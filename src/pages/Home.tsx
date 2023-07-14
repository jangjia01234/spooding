import { useRecoilState } from "recoil";

import { sampleState } from "@/state/sample";

const Home = () => {
  const [sample, setSample] = useRecoilState(sampleState);

  return (
    <>
      <h1>Home</h1>
      <p>{String(sample)}</p>
    </>
  );
};

export default Home;
