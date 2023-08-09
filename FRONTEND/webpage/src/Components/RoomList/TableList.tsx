import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Rooms, Boxes } from "@/Pages/RoomList/RoomList copy.tsx";

// 타입
type propsType = {
  areaId: number;
  data: Rooms[];
};

// 테이블 아이템
function TableList(props: propsType) {
  const columns: GridColDef[] = [
    { field: "title", headerName: "제목", width: 200 },
    {
      field: "category",
      headerName: "카테고리",
      width: 100,
    },
    {
      field: "store_id",
      headerName: "주문 가게",
      width: 100,
    },
    {
      field: "dfddd",
      headerName: "받는주소",
      width: 100,
    },
    {
      field: "max_people_number",
      headerName: "최대인원",
      width: 100,
    },
    {
      field: "locked",
      headerName: "입장가능여부",
      width: 100,
    },
  ];

  const areaId = props.areaId;

  console.log(areaId);

  const navigate = useNavigate();

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.data}
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
          console.log(selectedIdx);
          navigate(`/Home/Chatroom/${selectedIdx}`);
        }}
      />
    </Box>
  );
}

export default TableList;
