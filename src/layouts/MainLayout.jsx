import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
