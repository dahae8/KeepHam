import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

// 타입
type propsType = {
  areaId: number;
};

const columns: GridColDef[] = [
  { field: 'title', headerName: '제목', width: 200 },
  {
    field: 'category',
    headerName: '카테고리',
    width: 100,
  },
  {
    field: 'store',
    headerName: '주문 가게',
    width: 100,
  },
  {
    field: 'estimatedDeliveryTime',
    headerName: '예상 배달시간',
    type: 'number',
    width: 100,
  }
];

const rows = [
  { id: 1, title: "점심 같이 시켜드실분~", category: '한식', store: '미정', estimatedDeliveryTime: null },
  { id: 2, title: "점심 같이 시켜드실분~", category: '중식', store: '차이나호', estimatedDeliveryTime: 42 },
  { id: 3, title: "점심 같이 시켜드실분~", category: '일식/돈까스', store: '고메', estimatedDeliveryTime: 45 },
  { id: 4, title: "점심 같이 시켜드실분~", category: '프렌차이즈', store: 'Arya', estimatedDeliveryTime: 16 },
  { id: 5, title: "점심 같이 시켜드실분~", category: 'Targaryen', store: 'Daenerys', estimatedDeliveryTime: 35 },
  { id: 6, title: "점심 같이 시켜드실분~", category: 'Melisandre', store: null, estimatedDeliveryTime: 150 },
  { id: 7, title: "점심 같이 시켜드실분~", category: 'Clifford', store: 'Ferrara', estimatedDeliveryTime: 44 },
  { id: 8, title: "점심 같이 시켜드실분~", category: 'Frances', store: 'Rossini', estimatedDeliveryTime: 36 },
  { id: 9, title: "점심 같이 시켜드실분~", category: 'Roxie', store: 'Harvey', estimatedDeliveryTime: 65 },
];



// 테이블 아이템
function TableList(props: propsType) {
  const areaId = props.areaId;

  console.log(areaId);


  const navigate = useNavigate();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
          const selectedIdx: number = Number(selectedRow[0]) - 1
          console.log(selectedIdx);
          navigate(`/Home/Chatroom/${selectedIdx}`);
        }}
      />
    </Box>
  );
}

export default TableList;
