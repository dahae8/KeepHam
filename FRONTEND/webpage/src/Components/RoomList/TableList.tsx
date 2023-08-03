import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";

// 타입
type propsType = {
  boxId: number;
};

interface roomInfoType {
  id: number;
  title: string;
  category: string;
  store: string;
  estimatedDeliveryTime: number;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof roomInfoType;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof roomInfoType
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

// 데이터 생성
function createData(
  id: number,
  title: string,
  category: string,
  store: string,
  estimatedDeliveryTime: number
): roomInfoType {
  return {
    id,
    title,
    category,
    store,
    estimatedDeliveryTime,
  };
}

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "방 제목",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "카테고리",
  },
  {
    id: "store",
    numeric: false,
    disablePadding: false,
    label: "주문 가게",
  },
  {
    id: "estimatedDeliveryTime",
    numeric: true,
    disablePadding: false,
    label: "예상 배달시간",
  },
];

// 정렬
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// 테이블 메뉴
function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        채팅방 목록
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

// 테이블 컬럼
function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof roomInfoType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "title" ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 테이블 아이템
function TableList(props: propsType) {
  const boxId = props.boxId;

  console.log(boxId);
  // ToDo: 박스 정보에 따라서 방목록 불러와야함

  const rows = [
    createData(0, "점심 같이 시켜드실분~1", "한식", "미정", 67),
    createData(1, "점심 같이 시켜드실분~2", "한식", "미정", 51),
    createData(2, "점심 같이 시켜드실분~3", "한식", "미정", 24),
    createData(3, "점심 같이 시켜드실분~4", "한식", "미정", 24),
    createData(4, "점심 같이 시켜드실분~5", "한식", "미정", 49),
    createData(5, "점심 같이 시켜드실분~6", "한식", "미정", 67),
    createData(6, "점심 같이 시켜드실분~7", "한식", "미정", 51),
    createData(7, "점심 같이 시켜드실분~8", "한식", "미정", 24),
    createData(8, "점심 같이 시켜드실분~9", "한식", "미정", 24),
    createData(9, "점심 같이 시켜드실분~10", "한식", "미정", 49),
    createData(10, "점심 같이 시켜드실분~11", "한식", "미정", 67),
    createData(11, "점심 같이 시켜드실분~12", "한식", "미정", 51),
    createData(12, "점심 같이 시켜드실분~13", "한식", "미정", 24),
    createData(13, "점심 같이 시켜드실분~14", "한식", "미정", 24),
    createData(14, "점심 같이 시켜드실분~15", "한식", "미정", 49),
  ];

  const navigate = useNavigate();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof roomInfoType>("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof roomInfoType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, idx: number) => {
    navigate(`/Room/:${idx}`);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.store}</TableCell>
                    <TableCell align="right">
                      {row.estimatedDeliveryTime}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default TableList;
