import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// 타입
type propsType = {
  areaId: number;
};

interface Room {
  box_id: number;
  status: string;
  type: string;
  address: string;
  detailed_address: string;
  zip_code: string;
  latitude: number;
  hardness: number;
  valid: boolean;
  used: boolean;
}
interface forRoompage {
  id: number;
  location: string;
  address: string;
  available: number;
  enterable: number;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "제목", width: 200 },
  {
    field: "category",
    headerName: "카테고리",
    width: 100,
  },
  {
    field: "store",
    headerName: "주문 가게",
    width: 100,
  },
  {
    field: "estimatedDeliveryTime",
    headerName: "예상 배달시간",
    type: "number",
    width: 100,
  },
];

const rows = [
  {
    id: 1,
    title: "점심 같이 시켜드실분~",
    category: "한식",
    store: "미정",
    estimatedDeliveryTime: null,
  },
];

// 테이블 아이템
function TableList(props: propsType) {
  const areaId = props.areaId;
  console.log("방번호:", areaId);
  const navigate = useNavigate();

  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rowss, setrows] = useState<forRoompage[]>([]);

  useEffect(() => {
    const key = window.localStorage.getItem("AccessToken");
    const url = "https://i9c104.p.ssafy.io/api/boxs/" + areaId;
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer" + { key },
          },
        });
        console.log("응답 : ", response);
        setData(response.data.body);
        setLoading(false);
        const setboxes: forRoompage[] = data.map((item) => {
          let vaild = 1;
          if (item.valid) vaild = 1;
          else vaild = 0;

          return {
            id: item.box_id,
            location: item.address,
            address: item.detailed_address,
            available: vaild,
            enterable: 2,
          };
        });
        setrows(setboxes);
      } catch (error) {
        setError("AWS 서버에서 데이터를 가져오는데 에러가 발생했습니다.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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
          const selectedIdx: number = Number(selectedRow[0]) - 1;
          console.log(selectedIdx);
          navigate(`/Home/Chatroom/${selectedIdx}`);
        }}
      />
    </Box>
  );
}

export default TableList;
