import {
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import SetLoc from "@/Components/Landing/SetLoc.tsx";

function Landing() {
  

  return (
    <>
      <div className="h-screen w-screen bg-[url('/bg.jpg')] bg-cover flex items-center justify-center relative">
        <Box
          sx={{
            width: { xs: "100%", sm: 500 },
            backgroundColor: "white",
            padding: 4,
            marginY: { xs: 0, sm: 8 },
            borderRadius: { xs: 0, sm: 12 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            boxShadow: 3,
            mr: { xs: 0, sm: 8 },
          }}
        >
          <Typography variant="h4">배달음식 보관함 플랫폼</Typography>

          <Box
            sx={{
              width: 200,
              height: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              <img src="/logoWithImage_blue.svg" />
            </Link>
          </Box>
          <SetLoc />
        </Box>
      </div>
    </>
  );
}

export default Landing;
