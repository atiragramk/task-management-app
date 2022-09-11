import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header";
import Auth from "../../pages/Auth";

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
        {/* {!localStorage.getItem("token") && <Auth />} */}
      </Suspense>
    </>
  );
};
