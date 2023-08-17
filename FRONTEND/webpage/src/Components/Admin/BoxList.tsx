import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Boxes } from "@/Pages/RoomList/RoomList.tsx";

// 타입
type propsType = {
  data: Boxes[];
};

// 테이블 아이템
function BoxList(props: propsType) {
  const columns: GridColDef[] = [
    { field: "title", headerName: "함번호", width: 200 },
    {
      field: "store_id",
      headerName: "기본 주소",
      width: 100,
    },
    {
      field: "dfddd",
      headerName: "상세주소",
      width: 100,
    },
    {
      field: "max_people_number",
      headerName: "우편번호",
      width: 100,
    },
    {
      field: "locked",
      headerName: "상태",
      width: 100,
    },
  ];

  const navigate = useNavigate();
  const zipCode = window.sessionStorage.getItem("userZipCode");
  const userState = window.sessionStorage.getItem("userState");
  console.log(zipCode);

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
          if (userState === "isLoggedIn")
            navigate(`/Home/Chatroom/${selectedIdx}`);
          else navigate("/Auth");
        }}
      />
    </Box>
  );
}

export default BoxList;
