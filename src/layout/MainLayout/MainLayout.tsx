import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer.tsx";
import PropTypes from "prop-types";
import { LayoutProps } from "../../lib/types/layout.tsx";

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`min-h-screen`}
    >
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
