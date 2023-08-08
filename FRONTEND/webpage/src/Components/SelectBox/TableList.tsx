import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Box {
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

interface forpageBox {
  id: number;
  location: string;
  address: string;
  available: number;
  enterable: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "location", headerName: "위치", width: 160 },
  { field: "address", headerName: "주소", width: 160 },
  { field: "available", headerName: "이용가능", width: 80 },
  { field: "enterable", headerName: "입장가능", type: "number", width: 80 },
];

type propsType = {
  zipCode: number;
};

function TableList(props: propsType) {
  const [data, setData] = useState<Box[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setrows] = useState<forpageBox[]>([]);
  const userZipCode = props.zipCode;

  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://i9c104.p.ssafy.io/api/boxs/" + userZipCode;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data.body);
        setData(response.data.body);
        setLoading(false);
        // const setboxes: forpageBox[] = data.map((item) => {
        //   let vaild = 1;
        //   if (item.valid) vaild = 1;
        //   else vaild = 0;

        //   return {
        //     id: item.box_id,
        //     location: item.address,
        //     address: item.detailed_address,
        //     available: vaild,
        //     enterable: 2,
        //   };
        // });
        // setrows(setboxes);
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
  if (rows.length === 0) {
    const setboxes: forpageBox[] = data.map((item) => {
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
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(selectedRow) => {
          const selectedIdx: number = Number(selectedRow[0]);
          console.log(selectedIdx);
          if (window.sessionStorage.getItem("userId")) {
            navigate(`/Home/chatRoom/${selectedIdx}`);
          } else navigate("/Auth");
        }}
      />
    </div>
  );
}

export default TableList;
