"use client";

import { useEffect } from "react";
import Main from "./pages/main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    AOS.refresh();
  }, []);

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <Main />
    </div>
  );
}
