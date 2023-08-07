/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Grid,
} from "@mui/material";
import { MyLocation } from "@mui/icons-material";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    daum: any;
  }
}

function SetLoc() {
  const [idx, setIdx] = React.useState("");

  const [currentLoc, setCurrentLoc] = React.useState("설정안됨");

  const [locations, setLocations] = React.useState([{addressName: "위치를 설정해 주세요", zipCode: 0}]);

  const [latLong, setLatLong] = React.useState({ lat: 0, long: 0 });

  const navigate = useNavigate();

  // 행정 주소 받아오기
  useEffect(() => {

    const api: string = "KakaoAK " + import.meta.env.VITE_KAKAO_REST_API;

    async function get() {
      const headers = {
        Authorization: api,
      };

      const csParams = {
        query: "편의점",
        category_group_code: "CS2",
        x: latLong.long,
        y: latLong.lat,
      }
      
      const csResult = await axios({
        method: "get",
        headers: headers,
        params: csParams,
        url: "https://dapi.kakao.com/v2/local/search/keyword",
        data: {},
      });

      const dongArr: string[] = []

      let dataSize = 0;

      const filteredResult = csResult.data.documents.filter((location: any) => {
        const adr: string = location.address_name;

        const startIdx: number = adr.indexOf("구 ") + 2;
        const endIdx: number = adr.indexOf("동 ") + 1;

        const dong: string = adr.substring(startIdx, endIdx);
        
        if (dongArr.includes(dong)) {
          return false
        } else {
          dongArr.push(dong);
          dataSize += 1;
          return true;
        }
      })

      const tempLocation: {
        addressName: string,
        zipCode: number
      }[] = [];

      filteredResult.forEach(async (location: any) => {
        const adr: string = location.address_name;

        const idx: number = adr.indexOf("동 ");

        const shortName: string = adr.substring(0, idx + 1)

        const adParams = {
          query: adr,
        }
        
        const adResult = await axios({
          method: "get",
          headers: headers,
          params: adParams,
          url: "https://dapi.kakao.com/v2/local/search/address",
          data: {},
        });
        
        const zipCode = adResult.data.documents[0].road_address.zone_no;

        tempLocation.push({addressName: shortName, zipCode: zipCode})

        if(tempLocation.length === dataSize)
        {
          setCurrentLoc(tempLocation[0].addressName)
          setLocations(tempLocation);
        }
      });

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
  };

  // 선택항목 업데이트
  const menuItems = locations.map((location, locationIdx) => {
    return (
      <MenuItem key={locationIdx} value={locationIdx}>
        {location.addressName}
      </MenuItem>
    );
  });

  // 행정구역 선택
  const handleChange = (event: SelectChangeEvent) => {
    setIdx(event.target.value as string);
  };

  //행정구역 확정
  const confirmChange = () => {

    if (idx !== "" && locations[0].addressName !== "위치를 설정해 주세요")
    {
      const selectedIdx = Number(idx);
      const userLocation = locations[selectedIdx].addressName;

      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem("userLocation", userLocation);
      sessionStorage.setItem("userZipCode", locations[selectedIdx].zipCode.toString());
      
      navigate("/Home/ServiceArea");
    }
    
  }

  async function addressSearch() {
    const zoneApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      document.head.appendChild(script);
      script.onload = () => {
        resolve("우편번호 서비스 로드 완료!");
      };
    });

    const result = await zoneApiPromise;

    console.log(result);

    new window.daum.Postcode({
      oncomplete: function(data: any) {

        const tempLocation: {
          addressName: string,
          zipCode: number
        }[] = [];

        const adr: string = data.jibunAddress;

        const idx: number = adr.indexOf("동 ");

        const shortName: string = adr.substring(0, idx + 1)

        const zipCode: number = data.zonecode;

        tempLocation.push({addressName: shortName, zipCode: zipCode});

        setCurrentLoc(tempLocation[0].addressName)
        setLocations(tempLocation);
      }
  }).open();
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
              addressSearch();
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
    </>
  );
}

export default SetLoc;
