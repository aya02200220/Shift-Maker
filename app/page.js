import Main from "./pages/main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="flex justify-center">
      <ToastContainer />
      <Main />
    </div>
  );
}
