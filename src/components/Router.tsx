import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Loading } from "@/components/common";
import Header from "@/components/common/Header";
import { PATH } from "@/constants";

const Home = lazy(() => import("@/pages/Home"));
const Detail = lazy(() => import("@/pages/Detail"));
const Error404 = lazy(() => import("@/pages/Error404"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={`${PATH.DETAIL}/:id`} element={<Detail />} />
          <Route path={PATH.ALL} element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
