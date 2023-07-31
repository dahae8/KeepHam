import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../Common/common";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Link to={`BoxSearch`}>상자찾기</Link>
      <div></div>
      <Footer />
    </>
  );
}

export default App;
