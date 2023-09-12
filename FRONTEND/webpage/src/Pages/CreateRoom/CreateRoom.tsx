import * as React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyLocation } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateRoomInfo from "@/Components/CreateRoom/CreateRoomInfo.tsx";

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
// lat: 35.174343;
// lng: 126.80091;
interface Stores {
  id: number;
  category: string;
  store_id: number;
  name: string;
  address: string;
  estimated_delivery_time: string;
  min_order_amount: string;
  delivery_fee_to_display: string;
  logo_url: string;
  thumbnail_url: string;
  lat: number;
  lng: number;
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

  const [selectMode, setMode] = useState(0);
  const [Stores, setStores] = useState<Stores[]>([]);

  useEffect(() => {
    const zipCode = sessionStorage.getItem("userZipCode");
    const fetchBoxes = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/boxs/" + zipCode;
        const response = await axios.get(url);
        setBoxes(response.data.body);
        // console.log("ddd" ,response.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoxes();
  }, [address]);

  const fetchStores = async (a: string, b: number, c: number) => {
    const addRess = a.toString();
    const latitude = b.toString();
    const hardness = c.toString();
    console.log("dfdd", addRess, latitude, hardness);
    const queryParams = {
      address: addRess,
      lat: latitude,
      lng: hardness,
    };
    axios
      .get("https://i9c104.p.ssafy.io/api/stores", { params: queryParams })
      .then((res) => {
        console.log("https", res);
        setStores(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const boxsColumn: GridColDef[] = [
    { field: "box_id", headerName: "함번호", width: 40 },
    {
      field: "address",
      headerName: "기본 주소",
      width: 100,
    },
    {
      field: "detailed_address",
      headerName: "상세주소",
      width: 300,
    },
    {
      field: "zip_code",
      headerName: "우편번호",
      width: 150,
    },
    {
      field: "used",
      headerName: "사용중",
      width: 100,
    },
  ];
  const storeColumn: GridColDef[] = [
    {
      field: "name",
      headerName: "가게이름",
      width: 300,
    },
    {
      field: "category",
      headerName: "카테고리",
      width: 120,
    },
    {
      field: "min_order_amount",
      headerName: "배달료",
      width: 200,
    },
    {
      field: "delivery_fee_to_display",
      headerName: "최소주문금액",
      width: 200,
    },
    {
      field: "estimated_delivery_time",
      headerName: "배달예상시간",
      width: 200,
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 4 },
          minHeight: 650,
          // height: "calc(100vh - 320px)",
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
          {selectMode === 0 && (
            <Typography variant="h5">사용할 함을 선택하세요</Typography>
          )}
          {selectMode === 1 && (
            <Typography variant="h5">가게를 선택해주세요</Typography>
          )}
          {selectMode === 2 && (
            <Typography variant="h5">방정보를 입력해주세요</Typography>
          )}
        </div>
        <Divider />
        <div className="relative w-full min-h-[540px]" id="drawer-container">
          <div className="flex">
            {selectMode === 0 && (
              <Box sx={{ height: 470, width: "100%" }}>
                <DataGrid
                  rows={Boxes}
                  getRowId={(row) => row.box_id}
                  columns={boxsColumn}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 15,
                      },
                    },
                  }}
                  pageSizeOptions={[15]}
                  onRowSelectionModelChange={(selectedRow) => {
                    const selectedIdx: number = Number(selectedRow[0]);
                    const boxId = selectedRow[0].toString();
                    console.log("선택함번호", selectedIdx);
                    if (userState === "isLoggedIn") {
                      sessionStorage.setItem("selected BoxId", boxId);
                      for (let i = 0; i < Number(Boxes.length); i++) {
                        if (Boxes[i].box_id === selectedRow[0]) {
                          if (Boxes[i].used == false) {
                            fetchStores(
                              Boxes[i].address,
                              Boxes[i].latitude,
                              Boxes[i].hardness
                            );
                            setMode(1);
                          }
                        }
                      }
                    } else navigate("/Auth");
                  }}
                />
              </Box>
            )}
            {selectMode === 1 && (
              <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={Stores}
                  getRowId={(row) => row.id}
                  columns={storeColumn}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 30,
                      },
                    },
                  }}
                  pageSizeOptions={[30]}
                  onRowSelectionModelChange={(selectedRow) => {
                    const selectedIdx: number = Number(selectedRow[0]);
                    // const storeId = selectedRow[0].toString();
                    console.log("선택가게번호", selectedIdx);
                    if (userState === "isLoggedIn") {
                      for (let i = 0; i < Number(Stores.length); i++) {
                        if (Stores[i].id === selectedIdx) {
                          sessionStorage.setItem(
                            "selected StoreInfo",
                            Stores[i].store_id.toString()
                          );
                          sessionStorage.setItem(
                            "storeName",
                            Stores[i].name.toString()
                          );
                          sessionStorage.setItem(
                            "storeCategory",
                            Stores[i].category.toString()
                          );
                          setMode(2);
                        }
                      }
                    } else navigate("/Auth");
                  }}
                />
              </Box>
            )}
            {selectMode === 2 && <CreateRoomInfo />}
          </div>
          {selectMode === 0 && location}
        </div>
      </Box>
    </>
  );
}
