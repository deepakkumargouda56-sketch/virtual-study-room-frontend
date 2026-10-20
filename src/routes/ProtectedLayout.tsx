import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {

  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );

};

export default ProtectedLayout;