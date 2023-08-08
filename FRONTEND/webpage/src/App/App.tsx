import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../Common/common.ts";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Header />
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
