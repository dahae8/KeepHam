import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  IconButton,
  Modal,
  Grid,
} from "@mui/material";
import { MyLocation } from "@mui/icons-material";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

function SetLoc() {
  const [idx, setIdx] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [currentLoc, setCurrentLoc] = React.useState("설정안됨");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [locations, setLocations] = React.useState(["위치를 설정해 주세요"]);

  const [latLong, setLatLong] = React.useState({ lat: 0, long: 0 });

  const navigate = useNavigate();

  // 행정 주소 받아오기
  useEffect(() => {
    async function get() {
      const headers = {
        Authorization: "KakaoAK 51817020286485699aadcd83f8b19cce",
      };

      const params = {
        x: latLong.long,
        y: latLong.lat,
      };

      const result = await axios({
        method: "get",
        headers: headers,
        params: params,
        url: "https://dapi.kakao.com/v2/local/geo/coord2regioncode",
        data: {},
      });

      console.log(result.data);

      setCurrentLoc(
        result.data.documents[0].region_1depth_name +
          " " +
          result.data.documents[0].region_2depth_name
      );

      const dataLength = result.data.documents.length;

      const tempLocation: string[] = [];

      for (let i = 0; i < dataLength; i++) {
        tempLocation.push(result.data.documents[i].region_3depth_name);
      }

      setLocations(tempLocation);
    }

    if (latLong.lat !== 0) {
      get();
    }
  }, [latLong]);

  // 위치정보 수집
  const setGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatLong({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });

    setCurrentLoc("temp");
    setLocations(["temp"]);
  };

  // 선택항목 업데이트
  const menuItems = locations.map((location, locationIdx) => {
    return (
      <MenuItem key={locationIdx} value={locationIdx}>
        {location}
      </MenuItem>
    );
  });

  // 행정구역 선택
  const handleChange = (event: SelectChangeEvent) => {
    setIdx(event.target.value as string);
  };

  //행정구역 확정
  const confirmChange = () => {

    if (idx !== "" && locations[0] !== "위치를 설정해 주세요")
    {
      const selectedIdx = Number(idx);
      const entireLocation = currentLoc + locations[selectedIdx];

      console.log(entireLocation);

      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem("userLocation", entireLocation);
      
      navigate("/Home")
    }
    
  }

  return (
    <>
      <Typography variant="h6">배달을 받으실 지역을 설정해주세요</Typography>

      {/* 리스트 */}
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <FormControl
            sx={{
              width: 200,
            }}
          >
            <InputLabel>🌐</InputLabel>
            <Select value={idx} label="위치" onChange={handleChange}>
              {menuItems}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={confirmChange}>확인</Button>
        </Box>

      {/* 위치 권한 / 설정 */}
      <Grid
        container
        sx={{
          marginTop: 2,
          width: 300,
        }}
      >
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: 40,
            }}
          >
            <Typography variant="body2">현위치 :</Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: 40,
            }}
          >
            <Typography variant="body1">{currentLoc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={setGeolocation}>
            <MyLocation />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Box
            onClick={() => {
              handleOpen();
            }}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: 40,
            }}
          >
            <Typography variant="body2">검색</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: 300,
          gap: 2,
          marginTop: 2,
        }}
      ></Box>

      {/* 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default SetLoc;
