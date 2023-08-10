import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SetLoc from "@/Components/Landing/SetLoc.tsx";

function Landing() {
  return (
    <>
      <Box
        component="div"
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "start", sm: "center" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 500 },
            backgroundColor: "white",
            padding: 4,
            marginY: { xs: 0, sm: 8 },
            borderRadius: { xs: 0, sm: 12 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
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
      </Box>
    </>
  );
}

export default Landing;
