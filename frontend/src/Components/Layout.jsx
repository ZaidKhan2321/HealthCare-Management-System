import React from "react";
import Navigation from "./Navigation.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Navigation />
    <main style={{ padding: "2rem" }}>
      <Outlet />
    </main>
  </>
);

export default Layout;
