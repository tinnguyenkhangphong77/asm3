import { Outlet } from "react-router-dom";
import MainNavigation from "../Conponents/MainNavigation";
import Footer from "../Conponents/Footer";
import ChatBox from "../Chatlive/ChatBox";

function Root() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
      <ChatBox />
    </>
  );
}

export default Root;
