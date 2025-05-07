import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export const metadata = {
  title: "GoTogether | Share Your Ride",
  description: "Find or offer rides and travel together",
};

export default function Layout() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
