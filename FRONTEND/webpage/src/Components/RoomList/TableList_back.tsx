import {
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

type propsType = {
  boxId: number;
};

type roomInfoType = {
  id: number;
  title: string;
  category: string;
  store: string;
  estimatedDeliveryTime: string;
};

function TableList(props: propsType) {
  const boxId = props.boxId;

  console.log(boxId);

  // 방정보 가져오는 기능

  const rows: Array<roomInfoType> = [
    {
      id: 0,
      title: "점심 같이 시켜드실분~1",
      category: "한식",
      store: "미정",
      estimatedDeliveryTime: "알 수 없음",
    },
    {
      id: 1,
      title: "점심 같이 시켜드실분~2",
      category: "한식",
      store: "미정",
      estimatedDeliveryTime: "알 수 없음",
    },
    {
      id: 2,
      title: "점심 같이 시켜드실분~3",
      category: "한식",
      store: "미정",
      estimatedDeliveryTime: "알 수 없음",
    },
    {
      id: 3,
      title: "점심 같이 시켜드실분~4",
      category: "한식",
      store: "미정",
      estimatedDeliveryTime: "알 수 없음",
    },
    {
      id: 4,
      title: "점심 같이 시켜드실분~5",
      category: "한식",
      store: "미정",
      estimatedDeliveryTime: "알 수 없음",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">채팅방 목록</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">원하는 음식이 없으신가요 ...?</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained">채팅방 생성하기</Button>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          margin: 3,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell align="right">카테고리</TableCell>
              <TableCell align="right">주문 가게</TableCell>
              <TableCell align="right">예상 배달시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.store}</TableCell>
                <TableCell align="right">{row.estimatedDeliveryTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableList;
