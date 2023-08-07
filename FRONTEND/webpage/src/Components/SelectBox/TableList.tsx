import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'location', headerName: '위치', width: 160 },
  { field: 'address', headerName: '주소', width: 160 },
  { field: 'available', headerName: '이용가능', width: 80 },
  {
    field: 'enterable',
    headerName: '입장가능',
    type: 'number',
    width: 80,
  }
];

const rows = [
  { id: 1, location: 'SSAFY 광주캠퍼스', address: '하남산단 6번로 133', available: 35 , enterable: 3},
  { id: 2, location: '삼성전자 그린시티 1', address: '하남산단 6번로 100', available: 42 , enterable: 3},
  { id: 3, location: '휴먼시아 6단지', address: '광산구 풍영로 329', available: 45 , enterable: 3},
  { id: 4, location: '다농 오피스텔', address: '하남산단 6번로 80', available: 16 , enterable: 3},
  { id: 5, location: '수완우미린 2차', address: '광산구 풍영로 330', available: null , enterable: 3},
  { id: 6, location: 'Melisandre', address: null, available: 150 , enterable: 3},
  { id: 7, location: 'Clifford', address: 'Ferrara', available: 44 , enterable: 3},
  { id: 8, location: 'Frances', address: 'Rossini', available: 36 , enterable: 3},
  { id: 9, location: 'Roxie', address: 'Harvey', available: 65 , enterable: 3},
];

type propsType = {
  zipCode: number;
};

function TableList(props: propsType) {
  const userZipCode = props.zipCode;

  const navigate = useNavigate();

  console.log(userZipCode);

  return (
    <div style={{ height: 400, width: '100%' }}>
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
          const selectedIdx: number = Number(selectedRow[0]) - 1
          console.log(selectedIdx);
          navigate(`/Home/RoomLIst/${selectedIdx}`);
        }}
      />
    </div>
  );
}

export default TableList