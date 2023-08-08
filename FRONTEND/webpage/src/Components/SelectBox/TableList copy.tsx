import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "location", headerName: "위치", width: 160 },
  { field: "address", headerName: "주소", width: 160 },
  { field: "available", headerName: "이용가능", width: 80 },
  {
    field: "enterable",
    headerName: "입장가능",
    type: "number",
    width: 80,
  },
];

const rows = [
  {
    id: 1,
    location: "SSAFY 광주캠퍼스",
    address: "하남산단 6번로 133",
    available: 35,
    enterable: 3,
  },
];

type propsType = {
  zipCode: number;
};

interface Boxes {
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

interface forRows {
  id: number;
  location: string;
  address: string;
  available: number;
  enterable: number;
}

function TableList(props: propsType) {
  const userZipCode = props.zipCode;

  const navigate = useNavigate();

  console.log(userZipCode);

  const [data, setData] = useState<forRows[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = window.localStorage.getItem("AccessToken");
    const fetchData = async () => {
      try {
        const url = "http://i9c104.p.ssafy.io:48080/api/boxs/" + userZipCode;
        const response = await axios.get(url);
        console.log(response.data.body);
        setLoading(false);

        if (data.length === 0) {
          const boxesList: forRows[] = response.data.body.map((data: Boxes) => {
            return {
              id: data.box_id,
              location: data.detailed_address,
              address: data.detailed_address,
              available: data.zip_code,
              enterable: 1,
            };
          });
          setData(boxesList);
        }
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

  console.log("data : ", data);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(selectedRow) => {
          const selectedIdx: number = Number(selectedRow[0]) - 1;
          console.log(selectedIdx);
          navigate(`/Home/RoomLIst/${selectedIdx}`);
        }}
      />
    </div>
  );
}

export default TableList;
