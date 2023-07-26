import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../Common/common";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d0845b17f7524197f834876a2b8d46da"
      ></script>
      <Header />
      <Outlet />
      <Link to={`BoxSearch`}>상자찾기</Link>
      <Footer />
    </>
  );
}

export default App;
