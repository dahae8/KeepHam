import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../Common/common.ts";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <div className="w-screen bg-[url('/bg.jpg')] bg-cover flex justify-center items-center flex-col min-w-[500px] h-fit">
        <Box
          sx={{
            width: { xs: "100%", lg: "70%" },
            backgroundColor: "white",
            padding: 4,
            marginY: { xs: 0, lg: 8 },
            borderRadius: { xs: 0, lg: 12 },
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
