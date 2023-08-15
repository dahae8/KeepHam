import { useState } from "react";
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import QRCode from "react-qr-code";

type propsType = {
  getPassword: (e: number) => void;
  roomPw: number;
  openBox: () => void;
};

function BoxSettings(props: propsType) {
  const [pwValue, setPwValue] = useState<number>(0);
  const [verify, setVerify] = useState<number>(0);

  return (
    <>
      <Box
        sx={{
          margin: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color={"white"}>
              함 개방
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => {
                setVerify(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                if (pwValue === verify) props.openBox();
              }}
            >
              함 개방
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color={"white"}>
              함 비밀번호
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => {
                setPwValue(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                if (pwValue !== null) props.getPassword(pwValue);
              }}
            >
              설정
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 216,
                  height: 216,
                  padding: 1,
                  backgroundColor: "white",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QRCode value={props.roomPw.toString()} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BoxSettings;
