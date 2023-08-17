import "./App.css";
import { Outlet } from "react-router-dom";
// import { Header, Footer } from "../Common/common.ts";
import Footer from "@/Common/Footer/Footer.tsx";
import HeaderCopy from "@/Common/Header/Header copy.tsx";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <HeaderCopy />
      <div className="bg-[url('/bg.jpg')] bg-cover flex justify-center items-center flex-col min-w-[480px] h-fit">
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            backgroundColor: "white",
            marginY: { xs: 0, md: 8 },
            borderRadius: { xs: 0, md: 12 },
          }}
        >
          <Outlet />
        </Box>
      </div>
      <Footer />
    </>
  );
}

export default App;
