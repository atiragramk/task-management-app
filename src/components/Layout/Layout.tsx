import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};
