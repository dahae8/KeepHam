import * as React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import { MyLocation } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export async function loader({ params }: LoaderFunctionArgs) {
  const areaId = params.areaId;
  // 서버정보 필요
  const boxName = "다농 오피스텔";
  const boxAddress = "광주 장덕동";
  const boxStatus = "정상";

  return { areaId, boxName, boxAddress, boxStatus };
}

export interface Boxes {
  address: string;
  box_id: number;
  detailed_address: string;
  hardness: number;
  latitude: number;
  status: string;
  type: string;
  used: boolean;
  valid: boolean;
  zip_code: string;
}

export default function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [address, setAddress] = React.useState(
    sessionStorage.getItem("userLocation")!
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  async function addressSearch() {
    const zoneApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      document.head.appendChild(script);
      script.onload = () => {
        resolve("우편번호 서비스 로드 완료!");
      };
    });
    const result = await zoneApiPromise;
    console.log(result);
    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: function (data: any) {
        const adr: string = data.jibunAddress;

        const idx: number = adr.indexOf("동 ");

        const shortName: string = adr.substring(0, idx + 1);

        const zipCode: number = data.zonecode;

        setAddress(shortName);
        sessionStorage.setItem("userLocation", shortName);
        sessionStorage.setItem("userZipCode", zipCode.toString());
      },
    }).open();
  }
  const location = (
    <Box
      sx={{
        width: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 280,
          height: 80,
          marginBottom: 4,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E0F2FE",
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <MyLocation />
        </Box>
        <Typography variant="body1">{address}</Typography>
        <Button variant="outlined" onClick={addressSearch}>
          변경
        </Button>
      </Box>
    </Box>
  );

  const [Boxes, setBoxes] = useState<Boxes[]>([]);
  const userState = window.sessionStorage.getItem("userState");
  const navigate = useNavigate();

  useEffect(() => {
    const zipCode = sessionStorage.getItem("userZipCode");
    const fetchBoxes = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/boxs/" + zipCode;
        const response = await axios.get(url);
        setBoxes(response.data.body);
        console.log(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoxes();
  }, []);
  const columns: GridColDef[] = [
    { field: "box_id", headerName: "함번호", width: 200 },
    {
      field: "address",
      headerName: "기본 주소",
      width: 100,
    },
    {
      field: "detailed_address",
      headerName: "상세주소",
      width: 100,
    },
    {
      field: "zip_code",
      headerName: "우편번호",
      width: 100,
    },
    {
      field: "used",
      headerName: "사용중",
      width: 100,
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 4 },
          minHeight: 650,
          height: "calc(100vh - 320px)",
        }}
      >
        {/* 상단바 */}
        <div className="h-20 w-full flex items-center justify-start">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          ></IconButton>
          <Typography variant="h5">사용할 함을 선택하세요</Typography>
        </div>
        <Divider />
        <div className="relative w-full min-h-[540px]" id="drawer-container">
          <div className="flex">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={Boxes}
                getRowId={(row) => row.box_id}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                onRowSelectionModelChange={(selectedRow) => {
                  const selectedIdx: number = Number(selectedRow[0]);
                  const boxId = selectedRow[0].toString();
                  console.log(selectedIdx);
                  if (userState === "isLoggedIn") {
                    sessionStorage.setItem("selected BoxId", boxId);
                    // console.log("이게맞을까", Boxes[);
                    // navigate(`/Home/Chatroom/${selectedIdx}`);
                  } else navigate("/Auth");
                }}
              />
            </Box>
          </div>
          {location}
        </div>
      </Box>
    </>
  );
}
