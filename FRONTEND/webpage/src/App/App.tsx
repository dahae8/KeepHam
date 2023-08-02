import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../Common/common.ts";

function App() {
  return (
    <>
      <Header />
      <div className="w-screen bg-[url('/bg.jpg')] bg-cover flex justify-center items-center flex-col min-w-[400px]">
        <div className="w-[70vw] min-h-[80vh] bg-white rounded-[48px] my-8 p-10 min-w-[400px]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
