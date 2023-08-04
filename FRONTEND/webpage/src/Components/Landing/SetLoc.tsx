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
} from "@mui/material";
import { MyLocation, TravelExplore } from "@mui/icons-material";
import React from "react";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function placeSearchCB(data: any, status: any) {
//   if (status === window.kakao.maps.services.Status.OK) {
//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   }
// }

// async function getLocations() {
//   const mapApiPromise = new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src =
//       "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae6ec333dd28b629021d3a3d4e122d34&libraries=services&autoload=false";
//     document.head.appendChild(script);
//     script.onload = () => {
//       resolve("카카오맵 로드 완료!");
//     };
//   });

//   const result = await mapApiPromise;

//   // console.log(result);

//   const ps = new window.kakao.maps.services.Places();

//   ps.keywordSearch("이태원 맛집", placeSearchCB);
// }

// getLocations();

function SetLoc() {
  const [idx, setIdx] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [currentLoc, setCurrentLoc] = React.useState("설정안됨");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [locations, setLocations] = React.useState(["위치를 설정해 주세요"]);

  const menuItems = locations.map((location, locationIdx) => {
    return <MenuItem key={locationIdx}>{location}</MenuItem>;
  });

  // 함 선택
  const handleChange = (event: SelectChangeEvent) => {
    setIdx(event.target.value as string);
  };

  // 위치정보 수집
  const setGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
    });
  };

  return (
    <>
      <Typography variant="h6">배달을 받으실 지역을 설정해주세요</Typography>
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
        <Button variant="contained">확인</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: 240,
          gap: 2,
          marginTop: 2,
        }}
      >
        <Typography variant="body2">현위치 :</Typography>
        {currentLoc !== "설정안됨" ? (
          <Typography variant="h6">{currentLoc}</Typography>
        ) : (
          <>
            <Box
              onClick={setGeolocation}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <MyLocation />
              </IconButton>
              <Typography variant="body2">위치권한 허용</Typography>
            </Box>
          </>
        )}
      </Box>

      <Box
        onClick={() => {
          handleOpen();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <TravelExplore />
        </IconButton>
        <Typography variant="body2">위치 검색</Typography>
      </Box>

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
